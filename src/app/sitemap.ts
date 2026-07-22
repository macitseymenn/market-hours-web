import type { MetadataRoute } from "next";
import { SITE_URL, LEGAL_NAV } from "@/lib/site";
import { getAllPosts } from "@/content/blog";
import { getPathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

type SitemapHref = Parameters<typeof getPathname>[0]["href"];

export default function sitemap(): MetadataRoute.Sitemap {
  // Slug maps are shared across locales via the resolved post; English is only
  // used here to enumerate the posts (each carries every locale's slug).
  const posts = getAllPosts("en");

  const abs = (locale: (typeof routing.locales)[number], href: SitemapHref) =>
    `${SITE_URL}${getPathname({ locale, href })}`;

  // One sitemap entry per locale for a logical route, each carrying hreflang
  // alternates for every locale so search engines pair the localized URLs.
  const entries = (
    href: SitemapHref,
    opts: Pick<
      MetadataRoute.Sitemap[number],
      "lastModified" | "changeFrequency" | "priority"
    >,
  ): MetadataRoute.Sitemap =>
    routing.locales.map((locale) => ({
      url: abs(locale, href),
      ...opts,
      alternates: {
        languages: {
          en: abs("en", href),
          es: abs("es", href),
        },
      },
    }));

  const staticRoutes: MetadataRoute.Sitemap = [
    ...entries("/", {
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    }),
    ...entries("/blog", {
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }),
  ];

  // Blog post slugs are localized (English slug for /en, Spanish slug for /es),
  // so each locale URL uses its own slug and hreflang pairs them together.
  const postRoutes: MetadataRoute.Sitemap = posts.flatMap((p) => {
    const hrefFor = (locale: (typeof routing.locales)[number]): SitemapHref => ({
      pathname: "/blog/[slug]",
      params: { slug: p.slugs[locale] },
    });
    const opts = {
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
    return routing.locales.map((locale) => ({
      url: abs(locale, hrefFor(locale)),
      ...opts,
      alternates: {
        languages: {
          en: abs("en", hrefFor("en")),
          es: abs("es", hrefFor("es")),
        },
      },
    }));
  });

  // Trust / legal pages — indexable EEAT surface.
  const legalRoutes: MetadataRoute.Sitemap = LEGAL_NAV.flatMap((item) =>
    entries(item.href, {
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.4,
    }),
  );

  // Note: /author/* routes are intentionally omitted while author profiles are
  // placeholder — thin, low-value pages dilute crawl budget and are an EEAT
  // liability. Re-add here when real, credentialed author profiles exist.
  return [...staticRoutes, ...postRoutes, ...legalRoutes];
}
