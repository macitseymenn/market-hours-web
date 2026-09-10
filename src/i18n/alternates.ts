import { getPathname } from "./navigation";
import { routing, type Locale } from "./routing";
import { DEFAULT_LOCALE } from "./locales";

type Href = Parameters<typeof getPathname>[0]["href"];

/**
 * Build a page's `canonical` + `hreflang` alternates from the locales that are
 * actually live, so adding a language needs no metadata edits anywhere.
 *
 * `hrefFor` returns the route for a given locale, or `undefined` when the page
 * does not exist in that locale (a blog post whose translation is not written
 * yet). Missing locales are simply left out of the alternates, which is what
 * keeps hreflang honest: it only ever points at URLs that return 200.
 *
 * `x-default` goes to the default locale when that version exists, otherwise to
 * the locale being rendered.
 */
export function alternatesFor(
  locale: Locale,
  hrefFor: (l: Locale) => Href | undefined,
): { canonical: string; languages: Record<string, string> } {
  const languages: Record<string, string> = {};

  for (const l of routing.locales) {
    const href = hrefFor(l);
    if (href !== undefined) languages[l] = getPathname({ locale: l, href });
  }

  const own = hrefFor(locale);
  const canonical =
    own !== undefined
      ? getPathname({ locale, href: own })
      : (languages[DEFAULT_LOCALE] ?? `/${locale}`);

  const fallback = languages[DEFAULT_LOCALE] ?? canonical;
  languages["x-default"] = fallback;

  return { canonical, languages };
}

/** Shorthand for a page that lives at the same route in every locale. */
export function sharedAlternates(locale: Locale, href: Href) {
  return alternatesFor(locale, () => href);
}
