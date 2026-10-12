/**
 * Locale registry, the single source of truth for every language the site
 * supports. Adding a language is a data edit here plus its translations; no
 * routing, metadata, sitemap or component code needs to change.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * SCHEDULED LOCALE ROLLOUT
 * ─────────────────────────────────────────────────────────────────────────────
 * `availableFrom` works exactly like a blog post's `date` (see `isPublished` in
 * @/content/blog): the locale is committed now and goes live at 00:00 UTC on
 * that date. Until then it is absent from `routing.locales`, which means:
 *
 *   • its URLs 404 (the locale layout calls `notFound()` via `hasLocale`),
 *   • `localeDetection` never redirects a visitor to it,
 *   • it is missing from the language switcher, the sitemap, every hreflang
 *     alternate and the alternate-links response header.
 *
 * So a half-finished language can be committed safely: it simply does not exist
 * to visitors or crawlers until its date arrives. Omit `availableFrom` for a
 * locale that is live from launch.
 *
 * Set LOCALE_SHOW_DRAFTS=1 (e.g. in a Netlify deploy preview) to browse locales
 * that have not reached their date yet.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * WHAT THE TYPE SYSTEM ENFORCES
 * ─────────────────────────────────────────────────────────────────────────────
 * `LocaleCode` is derived from this array, so adding an entry immediately turns
 * every `Record<LocaleCode, T>` in the codebase into a compile error listing
 * exactly what still needs translating (home metadata, each legal page's COPY,
 * the message catalogue). The compiler is the translation checklist.
 *
 * Blog posts are the deliberate exception: they are `Partial`, gated per locale,
 * so a language can launch with a subset of the blog translated and the
 * untranslated posts stay invisible in that locale (no thin pages, no broken
 * hreflang). See `hasTranslation` in @/content/blog.
 */

export type LocaleMeta = {
  code: string;
  /** Endonym shown in the language switcher ("Français", not "French"). */
  name: string;
  /**
   * BCP-47 tag used for prose formatting: blog dates, the "verified {month}"
   * line, list formatting in the live market-status sentence.
   */
  intl: string;
  /**
   * BCP-47 tag used by the live clock / session timeline only. English keeps a
   * separate tag here because the prose uses British date order ("22 Jul")
   * while the clock has always rendered the US order ("Jul 22"); unifying the
   * two would change what is on screen, so the existing split is preserved.
   * For every other language both tags are the same.
   */
  intlClock: string;
  /** OpenGraph `og:locale` value. */
  ogLocale: string;
  /** Writing direction, drives the `dir` attribute on <html>. */
  dir: "ltr" | "rtl";
  /**
   * ISO date (YYYY-MM-DD) the locale becomes publicly visible. Omit for a
   * locale that has been live since launch.
   */
  availableFrom?: string;
};

export const LOCALES = [
  {
    code: "en",
    name: "English",
    intl: "en-GB",
    intlClock: "en-US",
    ogLocale: "en_US",
    dir: "ltr",
  },
  {
    code: "es",
    name: "Español",
    intl: "es-ES",
    intlClock: "es-ES",
    ogLocale: "es_ES",
    dir: "ltr",
  },
  {
    code: "fr",
    name: "Français",
    intl: "fr-FR",
    intlClock: "fr-FR",
    ogLocale: "fr_FR",
    dir: "ltr",
    availableFrom: "2026-09-10",
  },
  {
    code: "pt",
    name: "Português",
    intl: "pt-BR",
    intlClock: "pt-BR",
    ogLocale: "pt_BR",
    dir: "ltr",
    availableFrom: "2026-10-12",
  },
  {
    code: "tr",
    name: "Türkçe",
    intl: "tr-TR",
    intlClock: "tr-TR",
    ogLocale: "tr_TR",
    dir: "ltr",
    availableFrom: "2026-10-22",
  },
  {
    code: "de",
    name: "Deutsch",
    intl: "de-DE",
    intlClock: "de-DE",
    ogLocale: "de_DE",
    dir: "ltr",
    availableFrom: "2026-11-01",
  },
  {
    code: "it",
    name: "Italiano",
    intl: "it-IT",
    intlClock: "it-IT",
    ogLocale: "it_IT",
    dir: "ltr",
    availableFrom: "2026-11-11",
  },
] as const satisfies readonly LocaleMeta[];

export type LocaleCode = (typeof LOCALES)[number]["code"];

/** The locale served at the site's root and used for `x-default`. */
export const DEFAULT_LOCALE = "en" satisfies LocaleCode;

/** True once a locale has reached its `availableFrom` date. */
export function isLocaleLive(
  locale: { readonly code: string; readonly availableFrom?: string },
  now: number = Date.now(),
): boolean {
  if (process.env.LOCALE_SHOW_DRAFTS === "1") return true;
  if (!locale.availableFrom) return true;
  return Date.parse(`${locale.availableFrom}T00:00:00Z`) <= now;
}

/**
 * The locales visitors can actually reach right now, in registry order.
 * This is what feeds `routing.locales`, so everything derived from it (the
 * switcher, hreflang, the sitemap, static params) follows automatically.
 */
export function liveLocaleCodes(now: number = Date.now()): LocaleCode[] {
  return LOCALES.filter((l) => isLocaleLive(l, now)).map((l) => l.code);
}

const BY_CODE = new Map<string, LocaleMeta>(LOCALES.map((l) => [l.code, l]));

/** Registry entry for a locale code. Falls back to the default locale's entry. */
export function localeMeta(code: string): LocaleMeta {
  return BY_CODE.get(code) ?? BY_CODE.get(DEFAULT_LOCALE)!;
}
