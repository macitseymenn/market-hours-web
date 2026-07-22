import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  AUTHORS,
  getAuthor,
  isPlaceholderAuthor,
  DEFAULT_KNOWS_ABOUT,
} from "@/content/authors";
import { getPostsByAuthor, readingMinutes, type BlogLocale } from "@/content/blog";
import { formatDate } from "@/lib/format";
import { PUBLISHER, SITE_URL } from "@/lib/site";
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

  // While the profile is placeholder scaffolding it is kept out of the index so
  // no fabricated Person/identity is indexed for a YMYL topic. The moment the
  // orchestrator drops in a real, credentialed author (see authors.ts), the
  // guard flips and the page becomes indexable automatically — no code change.
  const placeholder = isPlaceholderAuthor(author);

  return {
    title: placeholder
      ? `${PUBLISHER.displayName} — ${l === "es" ? "Equipo editorial" : "Editorial Team"}`
      : `${author.name} — ${author.role}`,
    description: placeholder
      ? l === "es"
        ? `Perfil editorial de ${PUBLISHER.displayName}, responsable del contenido de Forex Market Hours.`
        : `Editorial profile for ${PUBLISHER.displayName}, responsible for Forex Market Hours content.`
      : author.bio,
    alternates: {
      canonical: getPathname({ locale: l, href }),
      languages: {
        en: getPathname({ locale: "en", href }),
        es: getPathname({ locale: "es", href }),
        "x-default": getPathname({ locale: "en", href }),
      },
    },
    robots: { index: !placeholder, follow: true },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as BlogLocale;
  const t = await getTranslations("blog");

  const author = getAuthor(slug);
  if (!author) notFound();

  const placeholder = isPlaceholderAuthor(author);
  const posts = getPostsByAuthor(author.slug, l);

  // Neutral, honest display identity while the profile is placeholder: attribute
  // to the Organization rather than render a fake person. Once real data lands,
  // the named author renders instead.
  const displayName = placeholder ? PUBLISHER.displayName : author.name;
  const displayRole = placeholder
    ? l === "es"
      ? "Equipo editorial"
      : "Editorial Team"
    : author.role;
  const displayBio = placeholder
    ? l === "es"
      ? `El contenido de Forex Market Hours lo mantiene ${PUBLISHER.displayName}. El perfil de autor con nombre se publicará aquí cuando esté disponible.`
      : `Forex Market Hours content is maintained by ${PUBLISHER.displayName}. A named author profile will appear here when available.`
    : author.bio;

  // Person structured data — establishes a real author's identity, expertise and
  // affiliation. Suppressed entirely while placeholder so no fabricated Person,
  // image or sameAs is ever emitted for this YMYL topic.
  const personJsonLd = placeholder
    ? null
    : {
        "@context": "https://schema.org",
        "@type": "Person",
        name: author.name,
        jobTitle: author.role,
        description: author.bio,
        url: `${SITE_URL}${getPathname({ locale: l, href: { pathname: "/author/[slug]", params: { slug: author.slug } } })}`,
        image: `${SITE_URL}${author.avatar}`,
        knowsAbout: author.knowsAbout ?? [...DEFAULT_KNOWS_ABOUT],
        worksFor: {
          "@type": "Organization",
          name: PUBLISHER.legalName,
          url: SITE_URL,
        },
        // Only real, verifiable profiles — never emitted while placeholder.
        ...(author.links.length > 0
          ? { sameAs: author.links.map((link) => link.href) }
          : {}),
      };

  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      {personJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(personJsonLd) }}
        />
      )}

      <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <Image
          src={placeholder ? "/icon.webp" : author.avatar}
          alt={displayName}
          width={112}
          height={112}
          className="rounded-2xl border border-surface-2"
        />
        <div>
          <h1 className="text-3xl font-semibold text-ivory sm:text-4xl">
            {displayName}
          </h1>
          <p className="mt-1 text-emerald">{displayRole}</p>
          <p className="mt-3 text-fog">{displayBio}</p>
        </div>
      </header>

      <section className="mt-10">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
          {t("authorAbout")}
        </h2>
        {placeholder ? (
          <p className="mt-3 text-fog">
            {l === "es" ? (
              <>
                Conoce quién desarrolla y mantiene esta herramienta en la{" "}
                <Link href="/about" className="text-emerald hover:underline">
                  página Acerca de
                </Link>
                , y cómo revisamos el contenido en nuestra{" "}
                <Link href="/editorial-policy" className="text-emerald hover:underline">
                  política editorial
                </Link>
                .
              </>
            ) : (
              <>
                Learn who builds and maintains this tool on the{" "}
                <Link href="/about" className="text-emerald hover:underline">
                  About page
                </Link>
                , and how content is reviewed in our{" "}
                <Link href="/editorial-policy" className="text-emerald hover:underline">
                  editorial policy
                </Link>
                .
              </>
            )}
          </p>
        ) : (
          <p className="mt-3 text-fog">{author.longBio}</p>
        )}
      </section>

      {!placeholder && author.credentials.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {t("authorExperience")}
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

      {/* Credibility links — the author's own profiles (also used as sameAs).
          Suppressed while placeholder so no fake x.com/username link is shown. */}
      {!placeholder && author.links.length > 0 && (
        <section className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {t("authorElsewhere")}
          </h2>
          <ul className="mt-3 flex flex-wrap gap-3">
            {author.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel={`noopener noreferrer${link.rel ? ` ${link.rel}` : ""}`}
                  className="inline-flex rounded-lg border border-surface-2 px-3 py-1.5 text-sm text-fog hover:border-emerald hover:text-emerald"
                >
                  {link.label} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {posts.length > 0 && (
        <section className="mt-12 border-t border-surface-2 pt-8">
          <h2 className="text-xl font-semibold text-ivory">
            {t("authorArticles", { name: displayName })}
          </h2>
          <ul className="mt-6 flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <div className="text-sm text-muted">
                  <time dateTime={post.date}>{formatDate(post.date, l)}</time> ·{" "}
                  {t("minRead", { minutes: readingMinutes(post.body) })}
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
