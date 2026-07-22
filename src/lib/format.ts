/** Format an ISO date (YYYY-MM-DD) for a locale, e.g. "22 June 2026" /
 *  "22 de junio de 2026". */
export function formatDate(iso: string, locale: string = "en"): string {
  // Parse as UTC noon to avoid off-by-one from timezone shifts.
  const d = new Date(`${iso}T12:00:00Z`);
  const intlLocale = locale === "es" ? "es-ES" : "en-GB";
  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
