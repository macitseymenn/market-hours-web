import { SITE_URL, LEGAL_NAV, CONTENT_DATES } from "@/lib/site";
import { POSTS, hasTranslation, isPublished, publishDate } from "@/content/blog";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localeMeta } from "@/i18n/locales";

// Custom sitemap route (instead of Next's metadata `sitemap.ts`) so we can add an
// `<?xml-stylesheet?>`, browsers render a friendly table, search engines read
// the raw XML. ISR (revalidate) rather than fully static so a scheduled post
// enters the sitemap automatically once it publishes, see `isPublished` in
// @/content/blog, and likewise for a scheduled locale (see @/i18n/locales).
export const revalidate = 3600;

type Href = Parameters<typeof getPathname>[0]["href"];
type Locale = (typeof routing.locales)[number];

/**
 * `lastmod` policy
 * ----------------
 * Every date below is a real editorial fact, never a build timestamp. That is
 * deliberate: Google only uses `lastmod` while it stays consistent with what
 * actually changed, and a file whose dates move on every rebuild gets its
 * `lastmod` values discounted wholesale, which would bury the genuinely new
 * URLs among the unchanged ones.
 *
 * A URL's date is therefore `max(content's own last change, the launch date of
 * the locale it is served in)`:
 *
 *   • unchanged English/Spanish pages keep their real, older dates, even on the
 *     day a new language ships,
 *   • every URL of a newly launched locale is dated that launch day, because
 *     those URLs genuinely did not exist before it.
 *
 * So a new language produces a burst of honestly-dated new URLs instead of
 * touching the dates of pages nobody edited.
 */
function maxDate(a: string, b: string): string {
  return a >= b ? a : b;
}

/** The day a locale became publicly reachable (site launch for the originals). */
function localeLaunch(locale: Locale): string {
  return localeMeta(locale).availableFrom ?? CONTENT_DATES.published;
}

type Entry = { locale: Locale; href: Href; lastmod: string };

type Route = {
  /**
   * One entry per locale this URL genuinely exists in. Only these become
   * `<url>` elements and only these are listed as each other's `hreflang`
   * alternates, so the sitemap never advertises a URL that 404s or points at
   * content in another language.
   */
  entries: Entry[];
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  /** A route that exists at the same href in every live locale. */
  const shared = (
    href: Href,
    changefreq: Route["changefreq"],
    priority: string,
    contentUpdated: string,
  ): Route => ({
    entries: routing.locales.map((locale) => ({
      locale,
      href,
      lastmod: maxDate(contentUpdated, localeLaunch(locale)),
    })),
    changefreq,
    priority,
  });

  /** Newest post date within a locale, i.e. when its blog listing last changed. */
  const newestPost = (locale: Locale): string =>
    POSTS.filter((p) => isPublished(p, locale) && hasTranslation(p, locale))
      .map((p) => p.localeUpdated?.[locale] ?? publishDate(p, locale))
      .reduce((a, b) => maxDate(a, b), CONTENT_DATES.published);

  const routes: Route[] = [
    shared("/", "weekly", "1.0", CONTENT_DATES.modified),
    {
      // The blog index changes whenever a post lands in that locale.
      entries: routing.locales.map((locale) => ({
        locale,
        href: "/blog" as Href,
        lastmod: maxDate(newestPost(locale), localeLaunch(locale)),
      })),
      changefreq: "weekly",
      priority: "0.8",
    },
    // Blog posts carry a localized slug per locale, and only exist in the
    // locales they are translated into. Each one is dated by when it actually
    // went live in that locale, not by when the original was written.
    ...POSTS.map(
      (post): Route => ({
        entries: routing.locales.flatMap((locale) => {
          if (!isPublished(post, locale) || !hasTranslation(post, locale)) return [];
          const slug = post.slug[locale];
          if (!slug) return [];
          return [
            {
              locale,
              href: { pathname: "/blog/[slug]", params: { slug } } as Href,
              lastmod: post.localeUpdated?.[locale] ?? publishDate(post, locale),
            },
          ];
        }),
        changefreq: "monthly",
        priority: "0.7",
      }),
    ),
    ...LEGAL_NAV.map((item) => shared(item.href, "yearly", "0.4", item.updated)),
  ];

  const abs = (locale: Locale, href: Href) =>
    `${SITE_URL}${getPathname({ locale, href })}`;

  const body = routes
    .flatMap((route) => {
      const links = route.entries
        .map(
          (e) =>
            `    <xhtml:link rel="alternate" hreflang="${e.locale}" href="${xmlEscape(abs(e.locale, e.href))}"/>`,
        )
        .join("\n");

      return route.entries.map(
        (e) => `  <url>
    <loc>${xmlEscape(abs(e.locale, e.href))}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
${links}
  </url>`,
      );
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${body}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
