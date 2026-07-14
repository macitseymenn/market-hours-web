/** Format an ISO date (YYYY-MM-DD) as e.g. "22 June 2026". */
export function formatDate(iso: string): string {
  // Parse as UTC noon to avoid off-by-one from timezone shifts.
  const d = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}
