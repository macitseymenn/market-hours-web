import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { AUTHORS, getAuthor } from "@/content/authors";
import { getPostsByAuthor, readingMinutes } from "@/content/blog";
import { formatDate } from "@/lib/format";
import { SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return AUTHORS.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const author = getAuthor(slug);
  if (!author) return {};
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const href = { pathname: "/author/[slug]", params: { slug: author.slug } } as const;

  return {
    title: `${author.name} — ${author.role}`,
    description: author.bio,
    alternates: {
      canonical: getPathname({ locale: l, href }),
      languages: {
        en: getPathname({ locale: "en", href }),
        es: getPathname({ locale: "es", href }),
        "x-default": getPathname({ locale: "en", href }),
      },
    },
    // Author profiles are placeholder — keep them out of the index so no
    // fabricated Person/identity is indexed for a YMYL topic. Remove this once
    // real, credentialed author profiles exist.
    robots: { index: false, follow: true },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const author = getAuthor(slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug);

  // Person structured data — establishes author identity/authoritativeness.
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${SITE_URL}/author/${author.slug}`,
    image: `${SITE_URL}${author.avatar}`,
    sameAs: author.links.map((l) => l.href),
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
      />

      <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src={author.avatar}
          alt={author.name}
          width={112}
          height={112}
          className="rounded-2xl border border-surface-2"
        />
        <div>
          <h1 className="text-3xl font-semibold text-ivory sm:text-4xl">
            {author.name}
          </h1>
          <p className="mt-1 text-emerald">{author.role}</p>
          <p className="mt-3 text-fog">{author.bio}</p>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          About
        </h2>
        <p className="mt-3 text-fog">{author.longBio}</p>
      </section>

      {author.credentials.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Experience
          </h2>
          <ul className="mt-3 flex flex-col gap-2 text-fog">
            {author.credentials.map((c) => (
              <li key={c} className="flex items-start gap-2">
                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald" />
                {c}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Credibility links — the author's own profiles (also used as sameAs). */}
      {author.links.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            Elsewhere
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {author.links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target="_blank"
                  rel={`noopener noreferrer${l.rel ? ` ${l.rel}` : ""}`}
                  className="inline-flex rounded-lg border border-surface-2 px-3 py-1.5 text-sm text-fog hover:border-emerald hover:text-emerald"
                >
                  {l.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mt-12 border-t border-surface-2 pt-8">
          <h2 className="text-xl font-semibold text-ivory">
            Articles by {author.name}
          </h2>
          <ul className="mt-6 flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <div className="text-sm text-muted">
                  <time dateTime={post.date}>{formatDate(post.date)}</time> ·{" "}
                  {readingMinutes(post.body)} min read
                </div>
                <h3 className="mt-1 text-lg font-semibold text-ivory">
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="hover:text-emerald"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-fog">{post.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
