import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getAllPosts } from "@/content/blog";
import { AUTHORS } from "@/content/authors";

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

  const authorRoutes: MetadataRoute.Sitemap = AUTHORS.map((a) => ({
    url: `${SITE_URL}/author/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...authorRoutes];
}
