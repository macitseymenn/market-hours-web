import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPost, readingMinutes } from "@/content/blog";
import { getAuthor } from "@/content/authors";
import { formatDate } from "@/lib/format";
import { PUBLISHER, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  const author = getAuthor(post.authorSlug);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: author ? [author.name] : undefined,
      tags: post.tags,
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const author = getAuthor(post.authorSlug);
  const url = `${SITE_URL}/blog/${post.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    mainEntityOfPage: url,
    url,
    keywords: post.tags.join(", "),
    author: author
      ? {
          "@type": "Person",
          name: author.name,
          url: `${SITE_URL}/author/${author.slug}`,
          sameAs: author.links.map((l) => l.href),
        }
      : undefined,
    publisher: { "@type": "Organization", name: PUBLISHER.legalName },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/blog" className="hover:text-emerald">
          ← Blog
        </Link>
      </nav>

      <header className="mt-6">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <span>{readingMinutes(post.body)} min read</span>
          {post.tags.map((t) => (
            <span key={t} className="rounded-full bg-surface px-2 py-0.5 text-xs text-emerald">
              {t}
            </span>
          ))}
        </div>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-ivory sm:text-[2.75rem]">
          {post.title}
        </h1>

        {author && (
          <div className="mt-6 flex items-center gap-3 border-y border-surface-2 py-4">
            <Image
              src={author.avatar}
              alt={author.name}
              width={44}
              height={44}
              className="rounded-full border border-surface-2"
            />
            <div className="text-sm">
              <Link
                href={`/author/${author.slug}`}
                className="font-semibold text-ivory hover:text-emerald"
              >
                {author.name}
              </Link>
              <p className="text-muted">{author.role}</p>
            </div>
          </div>
        )}
      </header>

      <div className="article-prose mt-8">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            a: ({ href, children }) => {
              const external = href?.startsWith("http");
              return (
                <a
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                >
                  {children}
                </a>
              );
            },
          }}
        >
          {post.body}
        </ReactMarkdown>
      </div>

      {post.updated && (
        <p className="mt-10 text-sm text-muted">
          Last updated {formatDate(post.updated)}.
        </p>
      )}

      {author && (
        <footer className="mt-12 rounded-2xl border border-surface-2 bg-surface/50 p-6">
          <div className="flex items-start gap-4">
            <Image
              src={author.avatar}
              alt={author.name}
              width={56}
              height={56}
              className="rounded-full border border-surface-2"
            />
            <div>
              <p className="text-sm text-muted">Written by</p>
              <Link
                href={`/author/${author.slug}`}
                className="font-semibold text-ivory hover:text-emerald"
              >
                {author.name}
              </Link>
              <p className="mt-1 text-sm text-fog">{author.bio}</p>
            </div>
          </div>
        </footer>
      )}
    </article>
  );
}
