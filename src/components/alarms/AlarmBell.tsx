"use client";

import { useTranslations } from "next-intl";
import { getMarket, nextOpen, nextClose } from "@/lib/markets";
import { formatCountdown, useAlarms, type AlarmEvent } from "./AlarmProvider";

/**
 * Per-market alarm control. Two independent toggles — one for the session OPEN
 * (▲) and one for the CLOSE (▼) — each showing a live "in …" countdown when
 * armed. `city` is the internal market key; `cityName` is the localized display
 * name shown to the user.
 */
export function AlarmBell({
  city,
  cityName,
  now,
}: {
  city: string;
  cityName: string;
  now: number | null;
}) {
  return (
    <div className="flex flex-col items-end gap-1.5">
      <AlarmChip event="open" city={city} cityName={cityName} now={now} />
      <AlarmChip event="close" city={city} cityName={cityName} now={now} />
    </div>
  );
}

function AlarmChip({
  event,
  city,
  cityName,
  now,
}: {
  event: AlarmEvent;
  city: string;
  cityName: string;
  now: number | null;
}) {
  const t = useTranslations("alarms");
  const { isArmed, toggle } = useAlarms();
  const armed = isArmed(city, event);
  const market = getMarket(city);
  const open = event === "open";
  const countdown =
    armed && now !== null && market
      ? formatCountdown((open ? nextOpen(market, now) : nextClose(market, now)) - now)
      : null;

  const setAriaKey = open ? "setAria" : "setAriaClose";
  const cancelAriaKey = open ? "cancelAria" : "cancelAriaClose";
  const titleOnKey = open ? "titleOn" : "titleOnClose";
  const titleOffKey = open ? "titleOff" : "titleOffClose";

  return (
    <button
      type="button"
      onClick={() => toggle(city, event)}
      aria-pressed={armed}
      aria-label={
        armed
          ? t(cancelAriaKey, { city: cityName })
          : t(setAriaKey, { city: cityName })
      }
      title={
        armed
          ? t(titleOnKey, { city: cityName, countdown: countdown ?? "" })
          : t(titleOffKey, { city: cityName })
      }
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] transition-colors ${
        armed
          ? "border-emerald bg-emerald/10 text-emerald"
          : "border-surface-2 text-muted hover:border-emerald hover:text-emerald"
      }`}
    >
      {/* Bell marks this as an alarm toggle; it fills in when armed. */}
      <svg
        viewBox="0 0 24 24"
        fill={armed ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3 w-3 shrink-0"
        aria-hidden="true"
      >
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
      <span aria-hidden="true" className="text-[8px] leading-none">
        {open ? "▲" : "▼"}
      </span>
      {armed && countdown ? (
        <span className="font-mono tabular-nums" suppressHydrationWarning>
          {countdown}
        </span>
      ) : (
        <span>{t(open ? "eventOpen" : "eventClose")}</span>
      )}
    </button>
  );
}
