"use client";

import { useEffect, useState } from "react";
import { getMarket, nextOpen } from "@/lib/markets";
import { SOUNDS } from "@/lib/sounds";
import { formatCountdown, useAlarms } from "./AlarmProvider";

/** Format a Date as a datetime-local input value ("YYYY-MM-DDTHH:MM"), local time. */
function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * "Session alarms" section — choose & TEST an alarm sound, enable notifications,
 * set a CUSTOM alarm at any date/time, and see/clear active alarms. Market alarms
 * are armed via the 🔔 next to each market in the timeline above.
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
    customAlarms,
    addCustomAlarm,
    removeCustomAlarm,
    clearAll,
  } = useAlarms();

  const [now, setNow] = useState<number | null>(null);
  const [dt, setDt] = useState("");
  const [label, setLabel] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Client-only clock + a sensible default alarm time (now + 10 min).
    /* eslint-disable react-hooks/set-state-in-effect */
    setNow(Date.now());
    setDt(toLocalInputValue(new Date(Date.now() + 10 * 60_000)));
    /* eslint-enable react-hooks/set-state-in-effect */
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const addCustom = () => {
    const at = new Date(dt).getTime();
    if (!dt || Number.isNaN(at)) {
      setError("Pick a date and time.");
      return;
    }
    if (at <= Date.now()) {
      setError("Choose a time in the future.");
      return;
    }
    addCustomAlarm(at, label);
    setLabel("");
    setError(null);
  };

  const totalAlarms = armed.length + customAlarms.length;

  return (
    <section id="alarms" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            Session alarms
          </h2>
          <p className="mt-4 text-lg text-fog">
            Get alerted the moment a market opens — or set your own alarm for any
            time. Choose and test your sound below. It all runs in your browser, no
            account needed.
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
                    <span className={active ? "text-emerald" : "text-muted"} aria-hidden="true">
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

          {/* Notifications */}
          <div className="rounded-2xl border border-surface-2 bg-surface/50 p-6">
            <h3 className="font-semibold text-ivory">Notifications</h3>
            <div className="mt-2 text-sm">
              {permission === "granted" && (
                <p className="text-emerald">✓ Browser notifications enabled.</p>
              )}
              {permission === "default" && (
                <div className="flex flex-wrap items-center gap-3">
                  <p className="text-muted">
                    Show a popup when an alarm rings, even in another tab.
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
            <p className="mt-4 text-xs text-muted">
              On another tab when an alarm rings? This tab keeps flashing 🔔 in its
              title until you come back. Alarms work while this tab is open — for
              alerts when the site is fully closed, use the{" "}
              <a href="#apps" className="text-emerald hover:underline">
                mobile app
              </a>
              .
            </p>
          </div>
        </div>

        {/* Custom alarm + active alarms */}
        <div className="mt-6 rounded-2xl border border-surface-2 bg-surface/50 p-6">
          <h3 className="font-semibold text-ivory">Set a custom alarm</h3>
          <p className="mt-2 text-sm text-muted">
            Pick any date and time and we’ll ring your chosen sound then.
          </p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <label className="flex flex-col gap-1 text-xs text-muted">
              Date &amp; time
              <input
                type="datetime-local"
                value={dt}
                onChange={(e) => setDt(e.target.value)}
                className="rounded-lg border border-surface-2 bg-charcoal px-3 py-2 text-sm text-ivory outline-none focus-visible:border-emerald"
              />
            </label>
            <label className="flex flex-1 flex-col gap-1 text-xs text-muted">
              Label (optional)
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Check EUR/USD"
                maxLength={60}
                className="w-full min-w-[10rem] rounded-lg border border-surface-2 bg-charcoal px-3 py-2 text-sm text-ivory outline-none placeholder:text-muted focus-visible:border-emerald"
              />
            </label>
            <button
              type="button"
              onClick={addCustom}
              className="rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600"
            >
              Add alarm
            </button>
          </div>
          {error && <p className="mt-2 text-xs text-muted">{error}</p>}

          <h4 className="mt-8 text-sm font-semibold uppercase tracking-wide text-muted">
            Active alarms {totalAlarms > 0 && `(${totalAlarms})`}
          </h4>
          {totalAlarms === 0 ? (
            <p className="mt-3 text-sm text-muted">
              No alarms yet. Set one above, or tap the 🔔 next to a market in the
              timeline.
            </p>
          ) : (
            <>
              <ul className="mt-3 flex flex-col gap-2">
                {armed.map((city) => {
                  const m = getMarket(city);
                  const cd = m && now !== null ? formatCountdown(nextOpen(m, now) - now) : "";
                  return (
                    <li
                      key={`m-${city}`}
                      className="flex items-center justify-between rounded-lg border border-surface-2 px-3 py-2 text-sm"
                    >
                      <span className="flex items-center gap-2 text-ivory">
                        <span aria-hidden="true">{m?.flag}</span>
                        {city} <span className="text-muted">· opens</span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-fog" suppressHydrationWarning>
                          in {cd}
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
                {customAlarms.map((ca) => {
                  const cd = now !== null ? formatCountdown(ca.at - now) : "";
                  const when = new Intl.DateTimeFormat(undefined, {
                    weekday: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(ca.at));
                  return (
                    <li
                      key={`c-${ca.id}`}
                      className="flex items-center justify-between rounded-lg border border-surface-2 px-3 py-2 text-sm"
                    >
                      <span className="flex items-center gap-2 text-ivory">
                        <span aria-hidden="true">⏰</span>
                        {ca.label} <span className="text-muted">· {when}</span>
                      </span>
                      <span className="flex items-center gap-3">
                        <span className="font-mono text-fog" suppressHydrationWarning>
                          in {cd}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeCustomAlarm(ca.id)}
                          aria-label={`Remove alarm ${ca.label}`}
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
    </section>
  );
}
