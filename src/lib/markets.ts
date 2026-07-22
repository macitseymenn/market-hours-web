/**
 * Shared forex-market model + DST-accurate timezone helpers.
 * Used by the live timeline AND the alarm system so both compute session times
 * the same way. Everything is derived from IANA timezone rules via the Intl API,
 * so daylight-saving shifts are always correct with no data source needed.
 *
 * Sessions are defined by their LOCAL open/close hour in each market's own
 * timezone — that is what makes DST automatic (London always opens 08:00 local,
 * whether that's GMT or BST).
 */

export const DAY_MS = 86_400_000;
export const HOUR_MS = 3_600_000;

export type Market = {
  city: string;
  flag: string;
  tz: string;
  open: number;
  close: number;
  color: string;
};

// Editorial categorical colours — muted, cohesive, distinct per market.
export const MARKETS: Market[] = [
  { city: "Sydney", flag: "🇦🇺", tz: "Australia/Sydney", open: 8, close: 17, color: "#4e6e81" },
  { city: "Tokyo", flag: "🇯🇵", tz: "Asia/Tokyo", open: 9, close: 18, color: "#8a6d9b" },
  { city: "Frankfurt", flag: "🇩🇪", tz: "Europe/Berlin", open: 8, close: 17, color: "#c6a24c" },
  { city: "London", flag: "🇬🇧", tz: "Europe/London", open: 8, close: 17, color: "#b5654a" },
  { city: "New York", flag: "🇺🇸", tz: "America/New_York", open: 8, close: 17, color: "#5f8060" },
];

export function getMarket(city: string): Market | undefined {
  return MARKETS.find((m) => m.city === city);
}

/** Wall-clock parts of `instant` as seen in `tz`. */
export function tzParts(tz: string, instant: number) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const map: Record<string, number> = {};
  for (const p of dtf.formatToParts(instant)) {
    if (p.type !== "literal") map[p.type] = Number(p.value);
  }
  map.hour %= 24; // Intl can emit "24" at midnight
  return map;
}

/** Offset (ms) of `tz` from UTC at a given instant. */
export function tzOffset(tz: string, instant: number) {
  const m = tzParts(tz, instant);
  const asUTC = Date.UTC(m.year, m.month - 1, m.day, m.hour, m.minute, m.second);
  return asUTC - instant;
}

/** UTC instant for a wall-clock time in `tz` (guess-then-correct). */
export function wallToUtc(y: number, mo: number, d: number, h: number, tz: string) {
  const guess = Date.UTC(y, mo, d, h, 0, 0);
  return guess - tzOffset(tz, guess);
}

/** Is this market open at the instant `now`? (checks yesterday/today/tomorrow). */
export function isMarketOpen(m: Market, now: number): boolean {
  const p = tzParts(m.tz, now);
  for (const off of [-1, 0, 1]) {
    const openUtc = wallToUtc(p.year, p.month - 1, p.day + off, m.open, m.tz);
    const closeUtc = wallToUtc(p.year, p.month - 1, p.day + off, m.close, m.tz);
    if (now >= openUtc && now < closeUtc) return true;
  }
  return false;
}

/** The next session-open instant strictly after `now` (recurs daily). */
export function nextOpen(m: Market, now: number): number {
  const p = tzParts(m.tz, now);
  let best = Infinity;
  for (const off of [-1, 0, 1, 2]) {
    const o = wallToUtc(p.year, p.month - 1, p.day + off, m.open, m.tz);
    if (o > now && o < best) best = o;
  }
  return best;
}

/** The next session-close instant strictly after `now` (recurs daily). */
export function nextClose(m: Market, now: number): number {
  const p = tzParts(m.tz, now);
  let best = Infinity;
  for (const off of [-1, 0, 1, 2]) {
    const c = wallToUtc(p.year, p.month - 1, p.day + off, m.close, m.tz);
    if (c > now && c < best) best = c;
  }
  return best;
}
