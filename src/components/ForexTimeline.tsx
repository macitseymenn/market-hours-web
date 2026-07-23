"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  DAY_MS,
  MARKETS,
  type Market,
  tzParts,
  tzOffset,
  wallToUtc,
} from "@/lib/markets";
import { AlarmBell } from "./alarms/AlarmBell";
import { AlarmModal } from "./alarms/AlarmModal";

/** Window event other components (e.g. the hero <AlarmCta>) dispatch to open the
 *  alarm modal, which this timeline owns. Keeps the two components decoupled. */
export const OPEN_ALARMS_EVENT = "fmh:open-alarms";

/** Translate a city name via the `tool.cities` map, falling back to the raw
 *  name for timezones the visitor's browser reports that aren't in the list. */
type CityTranslator = { has: (k: string) => boolean; t: (k: string) => string };
function cityLabel(tr: CityTranslator, city: string): string {
  const key = `cities.${city}`;
  return tr.has(key) ? tr.t(key) : city;
}

/**
 * Live, DST-accurate "Forex Market Time Zone Converter".
 *
 * A 24-hour horizontal axis rendered in a user-selectable timezone. Each market
 * is drawn as a coloured bar spanning its open window, a moving "now" line marks
 * the current instant, and each row shows the market's own local time plus an
 * OPEN / CLOSED status. The market model + timezone maths live in `@/lib/markets`
 * (shared with the alarm system).
 */

// Selectable timezones, a broad list of major cities spanning every UTC offset,
// ordered roughly west → east. The live "(GMT +2)" suffix is appended at render
// time from the current offset, and the visitor's own timezone is auto-detected
// and pre-selected on load (added to the top of the list if not already here).
// City names are localized via the `tool.cities` message map (English name is
// the key), falling back to the English name for any city not translated.
const TZ_OPTIONS = [
  { tz: "Pacific/Honolulu", city: "Honolulu" },
  { tz: "America/Anchorage", city: "Anchorage" },
  { tz: "America/Los_Angeles", city: "Los Angeles" },
  { tz: "America/Denver", city: "Denver" },
  { tz: "America/Chicago", city: "Chicago" },
  { tz: "America/Mexico_City", city: "Mexico City" },
  { tz: "America/New_York", city: "New York" },
  { tz: "America/Toronto", city: "Toronto" },
  { tz: "America/Sao_Paulo", city: "São Paulo" },
  { tz: "America/Argentina/Buenos_Aires", city: "Buenos Aires" },
  { tz: "UTC", city: "UTC" },
  { tz: "Europe/London", city: "London" },
  { tz: "Europe/Lisbon", city: "Lisbon" },
  { tz: "Europe/Madrid", city: "Madrid" },
  { tz: "Europe/Paris", city: "Paris" },
  { tz: "Europe/Berlin", city: "Berlin" },
  { tz: "Africa/Lagos", city: "Lagos" },
  { tz: "Europe/Athens", city: "Athens" },
  { tz: "Africa/Cairo", city: "Cairo" },
  { tz: "Africa/Johannesburg", city: "Johannesburg" },
  { tz: "Europe/Istanbul", city: "Istanbul" },
  { tz: "Europe/Moscow", city: "Moscow" },
  { tz: "Asia/Riyadh", city: "Riyadh" },
  { tz: "Asia/Tehran", city: "Tehran" },
  { tz: "Asia/Dubai", city: "Dubai" },
  { tz: "Asia/Karachi", city: "Karachi" },
  { tz: "Asia/Kolkata", city: "Mumbai" },
  { tz: "Asia/Dhaka", city: "Dhaka" },
  { tz: "Asia/Bangkok", city: "Bangkok" },
  { tz: "Asia/Jakarta", city: "Jakarta" },
  { tz: "Asia/Shanghai", city: "Shanghai" },
  { tz: "Asia/Singapore", city: "Singapore" },
  { tz: "Asia/Hong_Kong", city: "Hong Kong" },
  { tz: "Australia/Perth", city: "Perth" },
  { tz: "Asia/Tokyo", city: "Tokyo" },
  { tz: "Asia/Seoul", city: "Seoul" },
  { tz: "Australia/Adelaide", city: "Adelaide" },
  { tz: "Australia/Sydney", city: "Sydney" },
  { tz: "Australia/Brisbane", city: "Brisbane" },
  { tz: "Pacific/Auckland", city: "Auckland" },
];

/** Human city name from an IANA tz id, e.g. "America/New_York" → "New York". */
function cityFromTz(tz: string) {
  const found = TZ_OPTIONS.find((o) => o.tz === tz);
  if (found) return found.city;
  const last = tz.split("/").pop() ?? tz;
  return last.replace(/_/g, " ");
}

/** e.g. "GMT +2", "GMT -4", "GMT +5:30". */
function gmtLabel(ms: number) {
  // Round to whole minutes at a single point so floating-point error in the
  // ms→hours division can never leave a remainder that rounds to 60 (which
  // previously rendered whole-hour zones as e.g. "GMT +8:60" for Tokyo, and
  // UTC as "GMT -0").
  const totalMinutes = Math.round(ms / 60_000);
  const sign = totalMinutes < 0 ? "-" : "+";
  const abs = Math.abs(totalMinutes);
  const whole = Math.floor(abs / 60);
  const mins = abs % 60;
  return `GMT ${sign}${whole}${mins ? `:${String(mins).padStart(2, "0")}` : ""}`;
}

type Bar = { leftPct: number; widthPct: number };

/** Minimal analog clock shown inside the "now" pin, white face, dark hands. */
function PinClock({ h, m, s }: { h: number; m: number; s: number }) {
  const C = 15;
  const hand = (deg: number, len: number, w: number, color: string) => {
    const rad = ((deg - 90) * Math.PI) / 180;
    return (
      <line
        x1={C}
        y1={C}
        x2={(C + len * Math.cos(rad)).toFixed(2)}
        y2={(C + len * Math.sin(rad)).toFixed(2)}
        stroke={color}
        strokeWidth={w}
        strokeLinecap="round"
      />
    );
  };
  return (
    <svg viewBox="0 0 30 30" className="h-7 w-7" aria-hidden="true">
      <circle cx={C} cy={C} r="13" fill="#ffffff" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      {hand(((h % 12) + m / 60) * 30, 6.5, 1.8, "#2a2320")}
      {hand(m * 6, 9.5, 1.4, "#2a2320")}
      {hand(s * 6, 10, 0.9, "#b5654a")}
      <circle cx={C} cy={C} r="1.3" fill="#2a2320" />
    </svg>
  );
}

export function ForexTimeline() {
  const t = useTranslations("tool");
  const tr: CityTranslator = { has: (k) => t.has(k), t: (k) => t(k) };
  // Format live clock weekdays/dates in the active locale (es -> "miércoles").
  const dtLocale = useLocale() === "es" ? "es-ES" : "en-US";
  const [now, setNow] = useState<number | null>(null);
  const [displayTz, setDisplayTz] = useState("UTC");
  const [hour24, setHour24] = useState(true);
  const [optionsOpen, setOptionsOpen] = useState(false);

  useEffect(() => {
    // Initialise client-only values after mount, the visitor's detected timezone
    // and the current time, to avoid a hydration mismatch. Runs once, not per
    // render, so the cascading-render concern the lint rule guards against does
    // not apply here.
    /* eslint-disable react-hooks/set-state-in-effect */
    const local = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (local) setDisplayTz(local);
    setNow(Date.now());
    /* eslint-enable react-hooks/set-state-in-effect */
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Let other components (the hero alarm CTA) open the alarm modal via a window
  // event, so this timeline stays the single owner of the modal's open state.
  useEffect(() => {
    const open = () => setOptionsOpen(true);
    window.addEventListener(OPEN_ALARMS_EVENT, open);
    return () => window.removeEventListener(OPEN_ALARMS_EVENT, open);
  }, []);

  // Build the dropdown: each option is "City (GMT +2)" with the live offset.
  // The visitor's detected timezone is included even if not in the preset list.
  const tzOptions = useMemo(() => {
    const list = [...TZ_OPTIONS];
    if (!list.some((o) => o.tz === displayTz)) {
      list.unshift({ tz: displayTz, city: cityFromTz(displayTz) });
    }
    return list.map((o) => {
      const name = cityLabel(tr, o.city);
      return {
        tz: o.tz,
        label:
          now !== null ? `${name} (${gmtLabel(tzOffset(o.tz, now))})` : name,
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayTz, now]);

  // Midnight today in the display timezone → the left edge of the 24h axis.
  const axisStart = useMemo(() => {
    if (now === null) return null;
    const p = tzParts(displayTz, now);
    return wallToUtc(p.year, p.month - 1, p.day, 0, displayTz);
  }, [now, displayTz]);

  const nowLeftPct =
    now !== null && axisStart !== null
      ? Math.min(100, Math.max(0, ((now - axisStart) / DAY_MS) * 100))
      : 0;

  // Now-pin values (time in the selected timezone), driving the minimal clock.
  const pinParts = now !== null ? tzParts(displayTz, now) : null;
  const pinTime =
    now !== null
      ? new Intl.DateTimeFormat(dtLocale, {
          timeZone: displayTz,
          hour: "numeric",
          minute: "2-digit",
          hour12: !hour24,
        }).format(now)
      : "";
  const pinDay =
    now !== null
      ? new Intl.DateTimeFormat(dtLocale, {
          timeZone: displayTz,
          weekday: "long",
        }).format(now)
      : "";

  return (
    <div className="rounded-2xl border border-surface-2 bg-surface/50 p-5 sm:p-6">
      {/* Controls */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-2 text-sm text-fog">
          <span className="text-muted">{t("yourTimezone")}</span>
          <select
            value={displayTz}
            onChange={(e) => setDisplayTz(e.target.value)}
            className="rounded-lg border border-surface-2 bg-charcoal px-3 py-1.5 text-ivory outline-none focus-visible:border-emerald"
          >
            {tzOptions.map((o) => (
              <option key={o.tz} value={o.tz}>
                {o.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-fog">
            {t("hour24")}
            <input
              type="checkbox"
              checked={hour24}
              onChange={(e) => setHour24(e.target.checked)}
              className="h-4 w-4 accent-emerald"
            />
          </label>
          <button
            type="button"
            onClick={() => setOptionsOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg border border-emerald/40 bg-emerald/10 px-3 py-1.5 text-sm font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald/15"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
              <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.7 21a2 2 0 0 1-3.4 0" />
            </svg>
            {t("alarms")}
          </button>
        </div>
      </div>

      <AlarmModal open={optionsOpen} onClose={() => setOptionsOpen(false)} />

      {/* Scrollable timeline. pt-20 reserves space above the hours for the pin.
          tabIndex+role make the horizontal scroll reachable by keyboard. */}
      <div
        className="timeline-scroll overflow-x-auto"
        tabIndex={0}
        role="group"
        aria-label={t("timelineAria")}
      >
        <div className="relative min-w-[680px] pt-20">
          <HoursHeader hour24={hour24} />

          <ul className="mt-1 divide-y divide-surface-2/60">
            {MARKETS.map((c) => (
              <CityRow
                key={c.city}
                city={c}
                cityName={cityLabel(tr, c.city)}
                statusOpen={t("sessionOpen", { city: cityLabel(tr, c.city) })}
                statusClosed={t("sessionClosed", { city: cityLabel(tr, c.city) })}
                now={now}
                axisStart={axisStart}
                hour24={hour24}
                dtLocale={dtLocale}
              />
            ))}
          </ul>

          {/* Overlay padded by the label-column width so the pin and the single
              continuous "now" line both align to the track and to each other. */}
          {now !== null && (
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                paddingLeft: `${LABEL_COL_REM}rem`,
                paddingRight: `${ALARM_COL_REM}rem`,
              }}
            >
              <div className="relative h-full">
                {/* The "now" pin, with a minimal live clock. */}
                <div
                  className="absolute top-0 z-20 flex -translate-x-1/2 flex-col items-center"
                  style={{ left: `${nowLeftPct}%` }}
                >
                  <div className="flex flex-col items-center gap-0.5 rounded-2xl bg-emerald px-2.5 py-1.5 text-white shadow-lg">
                    {pinParts && (
                      <PinClock h={pinParts.hour} m={pinParts.minute} s={pinParts.second} />
                    )}
                    <span
                      className="text-[11px] font-semibold leading-none tabular-nums"
                      suppressHydrationWarning
                    >
                      {pinTime}
                    </span>
                    <span className="text-[10px] font-medium leading-none">{pinDay}</span>
                  </div>
                  <div
                    className="h-0 w-0 border-x-[6px] border-t-[7px] border-x-transparent"
                    style={{ borderTopColor: "var(--color-emerald)" }}
                  />
                </div>
                {/* Continuous now-line, connecting from the pin down through all rows. */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 top-[4.25rem] w-0.5 -translate-x-1/2 rounded bg-emerald"
                  style={{ left: `${nowLeftPct}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <p className="mt-5 text-xs text-muted">{t("footnote")}</p>
    </div>
  );
}

// The now-line overlay padding must match these column widths. Keep the rem
// values in sync with the Tailwind width classes below (w-40 = 10rem, w-28 = 7rem).
const LABEL_COL_REM = 10;
const ALARM_COL_REM = 8;
const LABEL_COL = "w-40 shrink-0 pr-4";
const ALARM_COL = "w-32 shrink-0"; // trailing column for the alarm bells (8rem)

function HoursHeader({ hour24 }: { hour24: boolean }) {
  const ta = useTranslations("alarms");
  return (
    <div className="flex items-end">
      <div className={LABEL_COL} />
      <div className="relative h-6 flex-1">
        {Array.from({ length: 25 }).map((_, h) => {
          const twelve = h % 12 === 0 ? 12 : h % 12;
          const label = hour24 ? String(h % 24).padStart(2, "0") : String(twelve);
          return (
            <span
              key={h}
              className="absolute bottom-0 -translate-x-1/2 font-mono text-[10px] text-muted"
              style={{ left: `${((h / 24) * 100).toFixed(4)}%` }}
            >
              {label}
            </span>
          );
        })}
      </div>
      {/* Column header so the trailing Open/Close toggles read as alarms. */}
      <div className={`${ALARM_COL} flex items-center justify-end gap-1 pl-3`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-3 w-3 text-muted"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        <span className="text-[10px] font-semibold uppercase tracking-wide text-muted">
          {ta("bellLabel")}
        </span>
      </div>
    </div>
  );
}

function CityRow({
  city,
  cityName,
  statusOpen,
  statusClosed,
  now,
  axisStart,
  hour24,
  dtLocale,
}: {
  city: Market;
  cityName: string;
  statusOpen: string;
  statusClosed: string;
  now: number | null;
  axisStart: number | null;
  hour24: boolean;
  dtLocale: string;
}) {
  // Compute this market's open windows that intersect the visible 24h axis, plus
  // whether it is open right now. We check the local session for yesterday/today/
  // tomorrow so bars that straddle the axis edges still render.
  const { bars, openNow } = useMemo(() => {
    if (now === null || axisStart === null)
      return { bars: [] as Bar[], openNow: false };
    const axisEnd = axisStart + DAY_MS;
    const p = tzParts(city.tz, now);
    const out: Bar[] = [];
    let isOpen = false;
    for (const off of [-1, 0, 1]) {
      const openUtc = wallToUtc(p.year, p.month - 1, p.day + off, city.open, city.tz);
      const closeUtc = wallToUtc(p.year, p.month - 1, p.day + off, city.close, city.tz);
      if (now >= openUtc && now < closeUtc) isOpen = true;
      const s = Math.max(openUtc, axisStart);
      const e = Math.min(closeUtc, axisEnd);
      if (e > s) {
        out.push({
          leftPct: ((s - axisStart) / DAY_MS) * 100,
          widthPct: ((e - s) / DAY_MS) * 100,
        });
      }
    }
    return { bars: out, openNow: isOpen };
  }, [now, axisStart, city]);

  const localTime =
    now !== null
      ? new Intl.DateTimeFormat(dtLocale, {
          timeZone: city.tz,
          hour: "numeric",
          minute: "2-digit",
          hour12: !hour24,
        }).format(now)
      : "–";

  const localDate =
    now !== null
      ? new Intl.DateTimeFormat(dtLocale, {
          timeZone: city.tz,
          weekday: "short",
          month: "short",
          day: "numeric",
        }).format(now)
      : "";

  const offsetLabel =
    now !== null ? gmtLabel(tzOffset(city.tz, now)) : "";

  return (
    <li className="flex items-stretch py-3">
      <div className={`${LABEL_COL} flex items-center gap-3`}>
        <span aria-hidden="true" className="text-xl">
          {city.flag}
        </span>
        <span className="leading-tight">
          <span className="block font-semibold text-ivory">{cityName}</span>
          <span className="block font-mono text-sm text-fog">{localTime}</span>
          <span className="block text-[11px] text-muted">
            {localDate}
            {offsetLabel && ` · ${offsetLabel}`}
          </span>
        </span>
      </div>

      <div className="relative min-h-[52px] flex-1">
        {/* Status label */}
        <span
          className="absolute left-0 top-0 text-[11px] font-semibold uppercase tracking-wide"
          style={{ color: openNow ? city.color : "var(--color-muted)" }}
        >
          {openNow ? statusOpen : statusClosed}
        </span>
        {/* Empty rail, a clean track for each market (no hour gridlines). */}
        <div className="absolute inset-x-0 bottom-2 h-6 rounded-md bg-surface-2/50" />
        {/* Open-window bars, solid and prominent when open, faded when closed. */}
        {bars.map((b, i) => (
          <div
            key={i}
            className="absolute bottom-2 h-6 rounded-md shadow-sm"
            style={{
              left: `${b.leftPct}%`,
              width: `${b.widthPct}%`,
              backgroundColor: city.color,
              opacity: openNow ? 1 : 0.4,
            }}
          />
        ))}
      </div>

      {/* Alarm toggle in its own column, never overlaps the bars or now-line. */}
      <div className={`${ALARM_COL} flex items-center justify-end pl-3`}>
        <AlarmBell city={city.city} cityName={cityName} now={now} />
      </div>
    </li>
  );
}
