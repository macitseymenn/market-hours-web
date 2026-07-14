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
 * In-tab alarm system (no backend). Two kinds of alarm:
 *   • Market alarms — arm a market's 🔔; rings the moment that market OPENS.
 *   • Custom alarms — a one-shot alarm at any date/time the user picks.
 *
 * Persistent ringing: if an alarm triggers while THIS tab is in the background
 * (the user is on another tab), we keep the alarm going — the tab TITLE flashes,
 * the notification stays on screen (requireInteraction), and we re-attempt the
 * sound — until the user returns to this tab, at which point it stops and plays
 * once in the foreground. Everything persists in localStorage; no backend.
 */

type Perm = NotificationPermission | "unsupported";

export type CustomAlarm = { id: string; at: number; label: string };

type AlarmCtx = {
  armed: string[];
  customAlarms: CustomAlarm[];
  soundOn: boolean;
  sound: SoundId;
  permission: Perm;
  isArmed: (city: string) => boolean;
  toggle: (city: string) => void;
  addCustomAlarm: (at: number, label: string) => void;
  removeCustomAlarm: (id: string) => void;
  clearAll: () => void;
  setSoundOn: (b: boolean) => void;
  setSound: (id: SoundId) => void;
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
const LS_CUSTOM = "fmh:custom";
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
  const [customAlarms, setCustomAlarms] = useState<CustomAlarm[]>([]);
  const [soundOn, setSoundOnState] = useState(true);
  const [sound, setSoundState] = useState<SoundId>("chime");
  const [permission, setPermission] = useState<Perm>("default");

  // Load persisted state (client only, after mount) — one-time hydration.
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    try {
      const a = JSON.parse(localStorage.getItem(LS_ARMED) || "[]");
      if (Array.isArray(a)) setArmed(a.filter((c: string) => getMarket(c)));
      const cs = JSON.parse(localStorage.getItem(LS_CUSTOM) || "[]");
      if (Array.isArray(cs)) {
        const now = Date.now();
        setCustomAlarms(
          cs.filter((x: CustomAlarm) => x && typeof x.at === "number" && x.at > now),
        );
      }
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
      localStorage.setItem(LS_CUSTOM, JSON.stringify(customAlarms));
    } catch {
      /* ignore */
    }
  }, [customAlarms]);
  useEffect(() => {
    try {
      localStorage.setItem(LS_SOUND_ON, soundOn ? "1" : "0");
      localStorage.setItem(LS_SOUND_ID, sound);
    } catch {
      /* ignore */
    }
  }, [soundOn, sound]);

  const prevOpenRef = useRef<Record<string, number>>({});
  const firedCustomRef = useRef<Set<string>>(new Set());
  const baseTitleRef = useRef<string>("");
  const audioRef = useRef<AudioContext | null>(null);
  // Persistent-ringing state (refs, so flashing doesn't re-render every second).
  const ringingRef = useRef(false);
  const ringLabelRef = useRef("");
  const flashRef = useRef(false);
  const lastBeepRef = useRef(0);
  const notifRef = useRef<Notification | null>(null);

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

  const ring = useCallback(() => {
    if (!soundOn) return;
    const ctx = getCtx();
    if (ctx) playSound(ctx, sound);
  }, [soundOn, sound, getCtx]);

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

  const notify = useCallback(
    (title: string, body: string, tag: string, persistent = false) => {
      try {
        if (
          typeof Notification !== "undefined" &&
          Notification.permission === "granted"
        ) {
          const n = new Notification(title, {
            body,
            icon: "/icon.webp",
            tag,
            requireInteraction: persistent,
          });
          n.onclick = () => {
            try {
              window.focus();
            } catch {
              /* ignore */
            }
            n.close();
          };
          return n;
        }
      } catch {
        /* ignore */
      }
      return null;
    },
    [],
  );

  const stopRinging = useCallback(
    (playFinal: boolean) => {
      if (!ringingRef.current) return;
      ringingRef.current = false;
      try {
        notifRef.current?.close();
      } catch {
        /* ignore */
      }
      notifRef.current = null;
      if (baseTitleRef.current) document.title = baseTitleRef.current;
      if (playFinal) ring();
    },
    [ring],
  );

  const startRinging = useCallback(
    (title: string, body: string, tag: string) => {
      ringingRef.current = true;
      ringLabelRef.current = title;
      lastBeepRef.current = 0;
      notifRef.current = notify(title, body, tag, true);
      ring();
    },
    [notify, ring],
  );

  // Fire an alarm: keep ringing if we're in the background, else ring once.
  const trigger = useCallback(
    (title: string, body: string, tag: string) => {
      if (typeof document !== "undefined" && document.hidden) {
        startRinging(title, body, tag);
      } else {
        notify(title, body, tag, false);
        ring();
      }
    },
    [startRinging, notify, ring],
  );

  const removeCustomAlarm = useCallback((id: string) => {
    firedCustomRef.current.delete(id);
    setCustomAlarms((prev) => prev.filter((a) => a.id !== id));
  }, []);

  // Stop ringing the instant the user returns to this tab.
  useEffect(() => {
    const onReturn = () => {
      if (!document.hidden && ringingRef.current) stopRinging(true);
    };
    document.addEventListener("visibilitychange", onReturn);
    window.addEventListener("focus", onReturn);
    return () => {
      document.removeEventListener("visibilitychange", onReturn);
      window.removeEventListener("focus", onReturn);
    };
  }, [stopRinging]);

  // Global 1s loop.
  useEffect(() => {
    const tick = () => {
      const now = Date.now();

      // While an alarm is actively ringing, keep it going until the user returns.
      if (ringingRef.current) {
        if (!document.hidden) {
          stopRinging(true);
        } else {
          flashRef.current = !flashRef.current;
          document.title = flashRef.current
            ? `🔔 ${ringLabelRef.current}`
            : "‼️ Alarm — click to return";
          if (now - lastBeepRef.current > 2500) {
            lastBeepRef.current = now;
            ring();
          }
          return;
        }
      }

      if (armed.length === 0 && customAlarms.length === 0) {
        if (document.title.startsWith("⏰") && baseTitleRef.current) {
          document.title = baseTitleRef.current;
        } else if (!document.title.startsWith("⏰")) {
          baseTitleRef.current = document.title;
        }
        return;
      }

      if (!document.title.startsWith("⏰")) baseTitleRef.current = document.title;

      let nearest: { text: string; at: number } | null = null;

      for (const city of armed) {
        const m = getMarket(city);
        if (!m) continue;
        const open = nextOpen(m, now);
        if (!nearest || open < nearest.at) nearest = { text: `${city} opens`, at: open };
        const prev = prevOpenRef.current[city];
        if (prev !== undefined && open !== prev) {
          trigger(`${city} session is open`, `The ${city} forex session just opened.`, `fmh-${city}`);
        }
        prevOpenRef.current[city] = open;
      }

      for (const ca of customAlarms) {
        if (now >= ca.at) {
          if (!firedCustomRef.current.has(ca.id)) {
            firedCustomRef.current.add(ca.id);
            trigger(ca.label || "Alarm", "Your alarm is ringing.", `fmh-${ca.id}`);
            removeCustomAlarm(ca.id);
          }
          continue;
        }
        if (!nearest || ca.at < nearest.at) nearest = { text: ca.label || "Alarm", at: ca.at };
      }

      // If ringing just started this tick, let it own the title next tick.
      if (ringingRef.current) return;

      if (nearest) {
        document.title = `⏰ ${formatCountdown(nearest.at - now)} · ${nearest.text} — Forex Market Hours`;
      } else if (document.title.startsWith("⏰") && baseTitleRef.current) {
        document.title = baseTitleRef.current;
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
  }, [armed, customAlarms, ring, trigger, stopRinging, removeCustomAlarm]);

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

  const addCustomAlarm = useCallback((at: number, label: string) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `${at}-${Math.round(at % 100000)}`;
    if (typeof Notification !== "undefined" && Notification.permission === "default") {
      Notification.requestPermission()
        .then((p) => setPermission(p))
        .catch(() => {});
    }
    setCustomAlarms((prev) =>
      [...prev, { id, at, label: label.trim() || "Alarm" }].sort((a, b) => a.at - b.at),
    );
  }, []);

  const clearAll = useCallback(() => {
    prevOpenRef.current = {};
    firedCustomRef.current = new Set();
    setArmed([]);
    setCustomAlarms([]);
  }, []);

  const value = useMemo<AlarmCtx>(
    () => ({
      armed,
      customAlarms,
      soundOn,
      sound,
      permission,
      isArmed: (c) => armed.includes(c),
      toggle,
      addCustomAlarm,
      removeCustomAlarm,
      clearAll,
      setSoundOn: setSoundOnState,
      setSound: setSoundState,
      preview,
      requestPermission,
    }),
    [
      armed,
      customAlarms,
      soundOn,
      sound,
      permission,
      toggle,
      addCustomAlarm,
      removeCustomAlarm,
      clearAll,
      preview,
      requestPermission,
    ],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
