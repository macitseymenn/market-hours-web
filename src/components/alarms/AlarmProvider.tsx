"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { getMarket, nextOpen } from "@/lib/markets";
import { playSound, type SoundId } from "@/lib/sounds";

/**
 * In-tab alarm system (no backend). Users arm one or more markets; while a tab is
 * open we:
 *   • show a live countdown to the next open in the browser TAB TITLE,
 *   • ring the chosen sound + fire a Web Notification the moment that market OPENS.
 * The countdown you see is exactly the time until the alarm rings. Choices persist
 * in localStorage; alarms recur daily. For true background push → the mobile app.
 */

type Perm = NotificationPermission | "unsupported";

type AlarmCtx = {
  armed: string[];
  soundOn: boolean;
  sound: SoundId;
  permission: Perm;
  isArmed: (city: string) => boolean;
  toggle: (city: string) => void;
  clearAll: () => void;
  setSoundOn: (b: boolean) => void;
  setSound: (id: SoundId) => void;
  /** Play a sound now (for the "test" buttons); ignores the on/off toggle. */
  preview: (id?: SoundId) => void;
  requestPermission: () => void;
};

const Ctx = createContext<AlarmCtx | null>(null);

export function useAlarms(): AlarmCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAlarms must be used within <AlarmProvider>");
  return c;
}

const LS_ARMED = "fmh:alarms";
const LS_SOUND_ON = "fmh:soundOn";
const LS_SOUND_ID = "fmh:soundId";

/** ms → "H:MM:SS" or "MM:SS". */
export function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.round(ms / 1000));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
}

export function AlarmProvider({ children }: { children: React.ReactNode }) {
  const [armed, setArmed] = useState<string[]>([]);
  const [soundOn, setSoundOnState] = useState(true);
  const [sound, setSoundState] = useState<SoundId>("chime");
  const [permission, setPermission] = useState<Perm>("default");

  // Load persisted state (client only, after mount) — one-time hydration.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const a = JSON.parse(localStorage.getItem(LS_ARMED) || "[]");
      if (Array.isArray(a)) setArmed(a.filter((c: string) => getMarket(c)));
      const on = localStorage.getItem(LS_SOUND_ON);
      if (on !== null) setSoundOnState(on === "1");
      const id = localStorage.getItem(LS_SOUND_ID) as SoundId | null;
      if (id) setSoundState(id);
    } catch {
      /* ignore */
    }
    setPermission(
      typeof Notification === "undefined" ? "unsupported" : Notification.permission,
    );
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  // Persist.
  useEffect(() => {
    try {
      localStorage.setItem(LS_ARMED, JSON.stringify(armed));
    } catch {
      /* ignore */
    }
  }, [armed]);
  useEffect(() => {
    try {
      localStorage.setItem(LS_SOUND_ON, soundOn ? "1" : "0");
      localStorage.setItem(LS_SOUND_ID, sound);
    } catch {
      /* ignore */
    }
  }, [soundOn, sound]);

  const prevOpenRef = useRef<Record<string, number>>({});
  const baseTitleRef = useRef<string>("");
  const audioRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback((): AudioContext | null => {
    try {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext })
          .webkitAudioContext;
      if (!AC) return null;
      const ctx = audioRef.current ?? (audioRef.current = new AC());
      if (ctx.state === "suspended") void ctx.resume();
      return ctx;
    } catch {
      return null;
    }
  }, []);

  // Play the current sound for a real alarm (respects the on/off toggle).
  const ring = useCallback(() => {
    if (!soundOn) return;
    const ctx = getCtx();
    if (ctx) playSound(ctx, sound);
  }, [soundOn, sound, getCtx]);

  // Play a sound on demand (test buttons) — always audible.
  const preview = useCallback(
    (id?: SoundId) => {
      const chosen = id ?? sound;
      if (id) setSoundState(id);
      const ctx = getCtx();
      if (ctx) playSound(ctx, chosen);
    },
    [sound, getCtx],
  );

  const requestPermission = useCallback(() => {
    if (typeof Notification === "undefined") {
      setPermission("unsupported");
      return;
    }
    Notification.requestPermission()
      .then((p) => setPermission(p))
      .catch(() => {});
  }, []);

  // Global 1s loop: tab-title countdown + ring/notify on open.
  useEffect(() => {
    const tick = () => {
      const now = Date.now();

      if (armed.length === 0) {
        if (document.title.startsWith("⏰") && baseTitleRef.current) {
          document.title = baseTitleRef.current;
        } else if (!document.title.startsWith("⏰")) {
          baseTitleRef.current = document.title;
        }
        return;
      }

      if (!document.title.startsWith("⏰")) baseTitleRef.current = document.title;

      let nearest: { city: string; open: number } | null = null;
      for (const city of armed) {
        const m = getMarket(city);
        if (!m) continue;
        const open = nextOpen(m, now);
        if (!nearest || open < nearest.open) nearest = { city, open };

        const prev = prevOpenRef.current[city];
        if (prev !== undefined && open !== prev) {
          try {
            if (
              typeof Notification !== "undefined" &&
              Notification.permission === "granted"
            ) {
              new Notification(`${city} session is open`, {
                body: `The ${city} forex session just opened.`,
                icon: "/icon.webp",
                tag: `fmh-${city}`,
              });
            }
          } catch {
            /* ignore */
          }
          ring();
        }
        prevOpenRef.current[city] = open;
      }

      if (nearest) {
        document.title = `⏰ ${formatCountdown(nearest.open - now)} · ${nearest.city} opens — Forex Market Hours`;
      }
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => {
      clearInterval(id);
      if (document.title.startsWith("⏰") && baseTitleRef.current) {
        document.title = baseTitleRef.current;
      }
    };
  }, [armed, ring]);

  const toggle = useCallback((city: string) => {
    setArmed((prev) => {
      if (prev.includes(city)) {
        delete prevOpenRef.current[city];
        return prev.filter((c) => c !== city);
      }
      if (typeof Notification !== "undefined" && Notification.permission === "default") {
        Notification.requestPermission()
          .then((p) => setPermission(p))
          .catch(() => {});
      }
      return [...prev, city];
    });
  }, []);

  const clearAll = useCallback(() => {
    prevOpenRef.current = {};
    setArmed([]);
  }, []);

  const value = useMemo<AlarmCtx>(
    () => ({
      armed,
      soundOn,
      sound,
      permission,
      isArmed: (c) => armed.includes(c),
      toggle,
      clearAll,
      setSoundOn: setSoundOnState,
      setSound: setSoundState,
      preview,
      requestPermission,
    }),
    [armed, soundOn, sound, permission, toggle, clearAll, preview, requestPermission],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
