import { localeMeta } from "@/i18n/locales";

/** Format an ISO date (YYYY-MM-DD) for a locale, e.g. "22 June 2026" /
 *  "22 de junio de 2026". The BCP-47 tag comes from the locale registry, so a
 *  new language formats correctly with no change here. */
export function formatDate(iso: string, locale: string = "en"): string {
  // Parse as UTC noon to avoid off-by-one from timezone shifts.
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(localeMeta(locale).intl, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
