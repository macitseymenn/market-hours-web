import { SITE_URL, LEGAL_NAV } from "@/lib/site";
import { POSTS, hasTranslation, isPublished } from "@/content/blog";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Custom sitemap route (instead of Next's metadata `sitemap.ts`) so we can add an
// `<?xml-stylesheet?>`, browsers render a friendly table, search engines read
// the raw XML. ISR (revalidate) rather than fully static so a scheduled post
// enters the sitemap automatically once it publishes, see `isPublished` in
// @/content/blog, and likewise for a scheduled locale (see @/i18n/locales).
export const revalidate = 3600;

type Href = Parameters<typeof getPathname>[0]["href"];
type Locale = (typeof routing.locales)[number];

type Route = {
  /**
   * `[locale, route]` pairs for the locales this URL genuinely exists in. Only
   * these become `<url>` entries and only these appear as each other's
   * `hreflang` alternates, so the sitemap never advertises a URL that 404s or
   * points at content in another language.
   */
  entries: Array<[Locale, Href]>;
  lastmod: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const now = new Date().toISOString();

  /** A route that exists at the same href in every live locale. */
  const shared = (
    href: Href,
    changefreq: Route["changefreq"],
    priority: string,
    lastmod = now,
  ): Route => ({
    entries: routing.locales.map((locale) => [locale, href]),
    lastmod,
    changefreq,
    priority,
  });

  const routes: Route[] = [
    shared("/", "weekly", "1.0"),
    shared("/blog", "weekly", "0.8"),
    // Blog posts carry a localized slug per locale, and only exist in the
    // locales they are translated into.
    ...POSTS.filter((post) => isPublished(post)).map(
      (post): Route => ({
        entries: routing.locales.flatMap((locale) => {
          const slug = post.slug[locale];
          if (!slug || !hasTranslation(post, locale)) return [];
          const href: Href = { pathname: "/blog/[slug]", params: { slug } };
          return [[locale, href] as [Locale, Href]];
        }),
        lastmod: new Date(post.updated ?? post.date).toISOString(),
        changefreq: "monthly",
        priority: "0.7",
      }),
    ),
    ...LEGAL_NAV.map((item) => shared(item.href, "yearly", "0.4")),
  ];

  const abs = (locale: Locale, href: Href) =>
    `${SITE_URL}${getPathname({ locale, href })}`;

  const body = routes
    .flatMap((route) => {
      const links = route.entries
        .map(
          ([locale, href]) =>
            `    <xhtml:link rel="alternate" hreflang="${locale}" href="${xmlEscape(abs(locale, href))}"/>`,
        )
        .join("\n");

      return route.entries.map(
        ([locale, href]) => `  <url>
    <loc>${xmlEscape(abs(locale, href))}</loc>
    <lastmod>${route.lastmod}</lastmod>
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
