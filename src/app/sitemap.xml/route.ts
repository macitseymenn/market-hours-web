import { SITE_URL, LEGAL_NAV } from "@/lib/site";
import { getAllPosts } from "@/content/blog";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Custom sitemap route (instead of Next's metadata `sitemap.ts`) so we can add an
// `<?xml-stylesheet?>`, browsers render a friendly table, search engines read
// the raw XML. ISR (revalidate) rather than fully static so a scheduled post
// enters the sitemap automatically once it publishes, see `isPublished` in
// @/content/blog.
export const revalidate = 3600;

type Href = Parameters<typeof getPathname>[0]["href"];
type Locale = (typeof routing.locales)[number];

type Route = {
  hrefs: Record<Locale, Href>;
  lastmod: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
};

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function GET() {
  const now = new Date().toISOString();
  const posts = getAllPosts("en");

  const shared = (
    href: Href,
    changefreq: Route["changefreq"],
    priority: string,
    lastmod = now,
  ): Route => ({ hrefs: { en: href, es: href }, lastmod, changefreq, priority });

  const routes: Route[] = [
    shared("/", "weekly", "1.0"),
    shared("/blog", "weekly", "0.8"),
    // Blog posts carry a localized slug per locale; hreflang pairs them.
    ...posts.map(
      (p): Route => ({
        hrefs: {
          en: { pathname: "/blog/[slug]", params: { slug: p.slugs.en } },
          es: { pathname: "/blog/[slug]", params: { slug: p.slugs.es } },
        },
        lastmod: new Date(p.updated ?? p.date).toISOString(),
        changefreq: "monthly",
        priority: "0.7",
      }),
    ),
    ...LEGAL_NAV.map((item) => shared(item.href, "yearly", "0.4")),
  ];

  const abs = (locale: Locale, href: Href) =>
    `${SITE_URL}${getPathname({ locale, href })}`;

  const body = routes
    .flatMap((r) =>
      routing.locales.map((locale) => {
        const links = routing.locales
          .map(
            (l) =>
              `    <xhtml:link rel="alternate" hreflang="${l}" href="${xmlEscape(abs(l, r.hrefs[l]))}"/>`,
          )
          .join("\n");
        return `  <url>
    <loc>${xmlEscape(abs(locale, r.hrefs[locale]))}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
${links}
  </url>`;
      }),
    )
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
