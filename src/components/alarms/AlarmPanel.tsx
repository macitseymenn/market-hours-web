"use client";

import { useEffect, useState } from "react";
import { getMarket, nextOpen } from "@/lib/markets";
import { SOUNDS } from "@/lib/sounds";
import { formatCountdown, useAlarms } from "./AlarmProvider";

/**
 * "Session alarms" section — lets anyone choose & TEST an alarm sound, enable
 * notifications, and see/clear their active alarms. The actual arming happens via
 * the 🔔 next to each market in the timeline above.
 */
export function AlarmPanel() {
  const {
    sound,
    soundOn,
    setSoundOn,
    preview,
    permission,
    requestPermission,
    armed,
    toggle,
    clearAll,
  } = useAlarms();

  // Local ticking clock so the active-alarm countdowns update every second.
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    // Client-only clock for the countdowns; one-time init + interval.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="alarms" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            Session alarms
          </h2>
          <p className="mt-4 text-lg text-fog">
            Get alerted the moment a market opens. Tap the 🔔 next to any market in
            the timeline above to set an alarm — then pick and test your sound
            here. It all runs in your browser, no account needed.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Sound picker + test */}
          <div className="rounded-2xl border border-surface-2 bg-surface/50 p-6">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-ivory">Alarm sound</h3>
              <button
                type="button"
                onClick={() => setSoundOn(!soundOn)}
                aria-pressed={soundOn}
                className="rounded-lg border border-surface-2 px-3 py-1.5 text-xs text-fog transition-colors hover:border-emerald hover:text-emerald"
              >
                {soundOn ? "🔊 Sound on" : "🔈 Sound off"}
              </button>
            </div>
            <p className="mt-2 text-sm text-muted">
              Click a sound to select it and hear a preview.
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              {SOUNDS.map((s) => {
                const active = s.id === sound;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => preview(s.id)}
                    aria-pressed={active}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-colors ${
                      active
                        ? "border-emerald bg-emerald/10 text-ivory"
                        : "border-surface-2 text-fog hover:border-emerald"
                    }`}
                  >
                    <span className="font-medium">{s.label}</span>
                    <span
                      className={active ? "text-emerald" : "text-muted"}
                      aria-hidden="true"
                    >
                      ▶
                    </span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => preview()}
              className="mt-5 rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600"
            >
              ▶ Test selected sound
            </button>
          </div>

          {/* Notifications + active alarms */}
          <div className="rounded-2xl border border-surface-2 bg-surface/50 p-6">
            <h3 className="font-semibold text-ivory">Notifications</h3>
            <div className="mt-2 text-sm">
              {permission === "granted" && (
                <p className="text-emerald">✓ Browser notifications enabled.</p>
              )}
              {permission === "default" && (
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-muted">
                    Show a popup when a market opens, even in another tab.
                  </p>
                  <button
                    type="button"
                    onClick={requestPermission}
                    className="rounded-lg border border-emerald px-3 py-1.5 text-xs font-medium text-emerald transition-colors hover:bg-emerald/10"
                  >
                    Enable notifications
                  </button>
                </div>
              )}
              {permission === "denied" && (
                <p className="text-muted">
                  Notifications are blocked in your browser settings — the sound and
                  tab-title countdown still work.
                </p>
              )}
              {permission === "unsupported" && (
                <p className="text-muted">
                  Your browser doesn’t support notifications — using sound + the
                  tab-title countdown.
                </p>
              )}
            </div>

            <h3 className="mt-6 font-semibold text-ivory">Active alarms</h3>
            {armed.length === 0 ? (
              <p className="mt-2 text-sm text-muted">
                No alarms yet. Tap the 🔔 next to a market in the timeline above.
              </p>
            ) : (
              <>
                <ul className="mt-3 flex flex-col gap-2">
                  {armed.map((city) => {
                    const m = getMarket(city);
                    const cd =
                      m && now !== null
                        ? formatCountdown(nextOpen(m, now) - now)
                        : "";
                    return (
                      <li
                        key={city}
                        className="flex items-center justify-between rounded-lg border border-surface-2 px-3 py-2 text-sm"
                      >
                        <span className="flex items-center gap-2 text-ivory">
                          <span aria-hidden="true">{m?.flag}</span>
                          {city}
                        </span>
                        <span className="flex items-center gap-3">
                          <span className="font-mono text-fog" suppressHydrationWarning>
                            opens in {cd}
                          </span>
                          <button
                            type="button"
                            onClick={() => toggle(city)}
                            aria-label={`Remove ${city} alarm`}
                            className="text-muted transition-colors hover:text-ivory"
                          >
                            ✕
                          </button>
                        </span>
                      </li>
                    );
                  })}
                </ul>
                <button
                  type="button"
                  onClick={clearAll}
                  className="mt-4 text-sm text-muted underline-offset-4 hover:text-ivory hover:underline"
                >
                  Clear all alarms
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
