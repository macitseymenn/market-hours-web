import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts, readingMinutes } from "@/content/blog";
import { getAuthor } from "@/content/authors";
import { formatDate } from "@/lib/format";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";

const BLOG_TITLE = "Forex Market Hours Blog — Sessions & Trading Times";
const BLOG_DESC =
  "Clear guides to forex market hours, trading sessions, session overlaps and timezones — from the Forex Market Hours team.";

export const metadata: Metadata = {
  title: { absolute: BLOG_TITLE },
  description: BLOG_DESC,
  alternates: {
    canonical: "/blog",
    languages: { en: "/blog", "x-default": "/blog" },
  },
  openGraph: {
    type: "website",
    title: BLOG_TITLE,
    description: BLOG_DESC,
    url: `${SITE_URL}/blog`,
  },
};

// Blog structured data — lists the posts for search engines.
function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${PRODUCT.name} Blog`,
    url: `${SITE_URL}/blog`,
    publisher: { "@type": "Organization", name: PUBLISHER.legalName },
    blogPost: getAllPosts().map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
    })),
  };
}

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd()) }}
      />
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-fog">
          Clear, practical guides to forex market hours, trading sessions and the
          timezones that shape them.
        </p>
      </header>

      <ul className="mt-12 divide-y divide-surface-2">
        {posts.map((post) => {
          const author = getAuthor(post.authorSlug);
          return (
            <li key={post.slug} className="py-8 first:pt-0">
              <article>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{readingMinutes(post.body)} min read</span>
                  {post.tags[0] && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald">{post.tags[0]}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-ivory">
                  <Link href={`/blog/${post.slug}`} className="hover:text-emerald">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-fog">{post.description}</p>
                {author && (
                  <p className="mt-3 text-sm text-muted">
                    By{" "}
                    <Link
                      href={`/author/${author.slug}`}
                      className="text-fog hover:text-emerald"
                    >
                      {author.name}
                    </Link>
                  </p>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
