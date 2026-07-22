"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getMarket, nextOpen } from "@/lib/markets";
import { SOUNDS } from "@/lib/sounds";
import { formatCountdown, useAlarms } from "./AlarmProvider";

/** Format a Date as a datetime-local input value ("YYYY-MM-DDTHH:MM"), local time. */
function toLocalInputValue(d: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/**
 * The alarm settings UI (sound picker + test, notifications, custom alarm form,
 * active alarms). Rendered inside the Options modal above the timeline.
 */
export function AlarmSettings() {
  const t = useTranslations("alarms");
  const tc = useTranslations("tool");
  const locale = useLocale();
  const cityName = (city: string) =>
    tc.has(`cities.${city}`) ? tc(`cities.${city}`) : city;
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
      setError(t("errPickDateTime"));
      return;
    }
    if (at <= Date.now()) {
      setError(t("errFuture"));
      return;
    }
    addCustomAlarm(at, label);
    setLabel("");
    setError(null);
  };

  const totalAlarms = armed.length + customAlarms.length;

  return (
    <div className="flex flex-col divide-y divide-surface-2">
      {/* Sound */}
      <section className="pb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-ivory">{t("sound")}</h3>
          <button
            type="button"
            onClick={() => setSoundOn(!soundOn)}
            aria-pressed={soundOn}
            className="rounded-lg border border-surface-2 px-3 py-1.5 text-xs text-fog transition-colors hover:border-emerald hover:text-emerald"
          >
            {soundOn ? t("soundOn") : t("soundOff")}
          </button>
        </div>
        <p className="mt-2 text-sm text-muted">{t("soundHint")}</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
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
          className="mt-4 rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600"
        >
          {t("testSound")}
        </button>
      </section>

      {/* Notifications */}
      <section className="py-6">
        <h3 className="font-semibold text-ivory">{t("notifications")}</h3>
        <div className="mt-2 text-sm">
          {permission === "granted" && (
            <p className="text-emerald">{t("notifEnabled")}</p>
          )}
          {permission === "default" && (
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-muted">{t("notifPrompt")}</p>
              <button
                type="button"
                onClick={requestPermission}
                className="rounded-lg border border-emerald px-3 py-1.5 text-xs font-medium text-emerald transition-colors hover:bg-emerald/10"
              >
                {t("notifEnable")}
              </button>
            </div>
          )}
          {permission === "denied" && (
            <p className="text-muted">{t("notifDenied")}</p>
          )}
          {permission === "unsupported" && (
            <p className="text-muted">{t("notifUnsupported")}</p>
          )}
        </div>
        <p className="mt-3 text-xs text-muted">
          {t.rich("notifTabHint", {
            link: (chunks) => (
              <a href="#apps" className="text-emerald hover:underline">
                {chunks}
              </a>
            ),
          })}
        </p>
      </section>

      {/* Custom alarm */}
      <section className="py-6">
        <h3 className="font-semibold text-ivory">{t("customTitle")}</h3>
        <p className="mt-2 text-sm text-muted">{t("customHint")}</p>
        <div className="mt-4 flex flex-wrap items-end gap-3">
          <label className="flex flex-col gap-1 text-xs text-muted">
            {t("dateTime")}
            <input
              type="datetime-local"
              value={dt}
              onChange={(e) => setDt(e.target.value)}
              className="rounded-lg border border-surface-2 bg-charcoal px-3 py-2 text-sm text-ivory outline-none focus-visible:border-emerald"
            />
          </label>
          <label className="flex flex-1 flex-col gap-1 text-xs text-muted">
            {t("labelOptional")}
            <input
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder={t("labelPlaceholder")}
              maxLength={60}
              className="w-full min-w-[9rem] rounded-lg border border-surface-2 bg-charcoal px-3 py-2 text-sm text-ivory outline-none placeholder:text-muted focus-visible:border-emerald"
            />
          </label>
          <button
            type="button"
            onClick={addCustom}
            className="rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600"
          >
            {t("addAlarm")}
          </button>
        </div>
        {error && <p className="mt-2 text-xs text-muted">{error}</p>}
      </section>

      {/* Active alarms */}
      <section className="pt-6">
        <h3 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t("activeTitle")} {totalAlarms > 0 && `(${totalAlarms})`}
        </h3>
        {totalAlarms === 0 ? (
          <p className="mt-3 text-sm text-muted">{t("activeEmpty")}</p>
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
                      {cityName(city)}{" "}
                      <span className="text-muted">· {t("opens")}</span>
                    </span>
                    <span className="flex items-center gap-3">
                      <span className="font-mono text-fog" suppressHydrationWarning>
                        {t("inTime", { countdown: cd })}
                      </span>
                      <button
                        type="button"
                        onClick={() => toggle(city)}
                        aria-label={t("removeMarketAria", { city: cityName(city) })}
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
                const when = new Intl.DateTimeFormat(locale, {
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
                        {t("inTime", { countdown: cd })}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeCustomAlarm(ca.id)}
                        aria-label={t("removeCustomAria", { label: ca.label })}
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
              {t("clearAll")}
            </button>
          </>
        )}
      </section>
    </div>
  );
}
