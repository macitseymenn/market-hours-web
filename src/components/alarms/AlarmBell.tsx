"use client";

import { getMarket, nextOpen } from "@/lib/markets";
import { formatCountdown, useAlarms } from "./AlarmProvider";

/**
 * Per-market alarm toggle. When armed, shows a live "opens in …" countdown driven
 * by the timeline's `now`. Clicking arms/disarms an alarm for that market's next
 * session open.
 */
export function AlarmBell({ city, now }: { city: string; now: number | null }) {
  const { isArmed, toggle } = useAlarms();
  const armed = isArmed(city);
  const market = getMarket(city);
  const countdown =
    armed && now !== null && market
      ? formatCountdown(nextOpen(market, now) - now)
      : null;

  return (
    <button
      type="button"
      onClick={() => toggle(city)}
      aria-pressed={armed}
      aria-label={`${armed ? "Cancel" : "Set"} alarm for when ${city} opens`}
      title={
        armed
          ? `Alarm on — rings when ${city} opens (in ${countdown})`
          : `Alarm me when ${city} opens`
      }
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[11px] transition-colors ${
        armed
          ? "border-emerald bg-emerald/10 text-emerald"
          : "border-surface-2 text-muted hover:border-emerald hover:text-emerald"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        fill={armed ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-3.5 w-3.5"
        aria-hidden="true"
      >
        <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.7 21a2 2 0 0 1-3.4 0" />
      </svg>
      {armed && countdown ? (
        <span className="font-mono tabular-nums" suppressHydrationWarning>
          {countdown}
        </span>
      ) : (
        <span>Alarm</span>
      )}
    </button>
  );
}
