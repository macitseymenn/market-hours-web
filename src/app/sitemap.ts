import type { MetadataRoute } from "next";
import { SITE_URL, LEGAL_NAV } from "@/lib/site";
import { getAllPosts } from "@/content/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Trust / legal pages — indexable EEAT surface.
  const legalRoutes: MetadataRoute.Sitemap = LEGAL_NAV.map((item) => ({
    url: `${SITE_URL}${item.href}`,
    lastModified: new Date(),
    changeFrequency: "yearly",
    priority: 0.4,
  }));

  // Note: /author/* routes are intentionally omitted while author profiles are
  // placeholder — thin, low-value pages dilute crawl budget and are an EEAT
  // liability. Re-add here when real, credentialed author profiles exist.
  return [...staticRoutes, ...postRoutes, ...legalRoutes];
}
