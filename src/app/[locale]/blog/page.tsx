import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getAllPosts, readingMinutes, type BlogLocale } from "@/content/blog";
import { getAuthor } from "@/content/authors";
import { formatDate } from "@/lib/format";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

// ISR: re-render hourly so scheduled (future-dated) posts appear automatically
// once their publish date arrives — see `isPublished` in @/content/blog.
export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: l, namespace: "blog" });
  const href = "/blog";

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDesc"),
    alternates: {
      canonical: getPathname({ locale: l, href }),
      languages: {
        en: getPathname({ locale: "en", href }),
        es: getPathname({ locale: "es", href }),
        "x-default": getPathname({ locale: "en", href }),
      },
    },
    openGraph: {
      type: "website",
      title: t("metaTitle"),
      description: t("metaDesc"),
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

// Blog structured data — lists the posts for search engines.
function blogJsonLd(locale: BlogLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${PRODUCT.name} Blog`,
    url: `${SITE_URL}${getPathname({ locale, href: "/blog" })}`,
    publisher: { "@type": "Organization", name: PUBLISHER.legalName },
    blogPost: getAllPosts(locale).map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: `${SITE_URL}${getPathname({ locale, href: { pathname: "/blog/[slug]", params: { slug: p.slug } } })}`,
      datePublished: p.date,
      dateModified: p.updated ?? p.date,
    })),
  };
}

export default async function BlogIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as BlogLocale;
  const t = await getTranslations("blog");

  const posts = getAllPosts(l);
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(blogJsonLd(l)) }}
      />
      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">
          {t("indexTitle")}
        </h1>
        <p className="mt-4 text-lg text-fog">{t("indexIntro")}</p>
      </header>

      <ul className="mt-12 divide-y divide-surface-2">
        {posts.map((post) => {
          const author = getAuthor(post.authorSlug);
          return (
            <li key={post.slug} className="py-8 first:pt-0">
              <article>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted">
                  <time dateTime={post.date}>{formatDate(post.date, l)}</time>
                  <span aria-hidden="true">·</span>
                  <span>{t("minRead", { minutes: readingMinutes(post.body) })}</span>
                  {post.tags[0] && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span className="text-emerald">{post.tags[0]}</span>
                    </>
                  )}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-ivory">
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="hover:text-emerald"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-2 text-fog">{post.description}</p>
                {author && (
                  <p className="mt-3 text-sm text-muted">
                    {t.rich("by", {
                      name: author.name,
                      link: (chunks) => (
                        <Link
                          href={{ pathname: "/author/[slug]", params: { slug: author.slug } }}
                          className="text-fog hover:text-emerald"
                        >
                          {chunks}
                        </Link>
                      ),
                    })}
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
