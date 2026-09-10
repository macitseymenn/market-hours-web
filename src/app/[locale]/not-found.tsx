import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getAllPosts, type BlogLocale } from "@/content/blog";

/**
 * Localized 404, rendered inside the locale layout so it keeps the header,
 * footer, language switcher and theme. It handles every `notFound()` thrown
 * within the locale segment (an unknown blog slug, a post or translation that
 * has not reached its publish date, an unknown author) plus any unmatched URL
 * under a locale prefix, which the sibling `[...rest]` catch-all routes here.
 *
 * Next injects `<meta name="robots" content="noindex">` on 404 responses, so
 * nothing here needs to opt out of indexing.
 *
 * The page is deliberately a recovery point rather than a dead end: the live
 * clock is the whole product, so the primary action goes straight to it, and
 * the three most recent guides available IN THIS LOCALE are offered below.
 * Those are read through `getAllPosts`, which already filters out anything not
 * published or not translated here, so a 404 can never link to another 404.
 */
export default async function NotFound() {
  const locale = (await getLocale()) as BlogLocale;
  const t = await getTranslations("notFound");
  const tb = await getTranslations("blog");

  const popular = getAllPosts(locale).slice(0, 3);

  return (
    <section className="relative overflow-hidden">
      {/* Same restrained glow as the hero, so the page reads as part of the site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-20%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald/10 blur-3xl"
      />

      <div className="mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
        <p
          aria-hidden="true"
          className="font-mono text-6xl font-semibold leading-none tracking-tight text-emerald/25 sm:text-7xl"
        >
          {t("code")}
        </p>

        <h1 className="mt-6 text-3xl font-semibold leading-tight text-ivory sm:text-4xl">
          {t("h1")}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-fog">{t("lead")}</p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-5 py-2.5 text-sm font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald/15"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3.5 2" />
            </svg>
            {t("toolCta")}
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 rounded-full border border-surface-2 px-5 py-2.5 text-sm font-medium text-fog transition-colors hover:border-muted hover:text-ivory"
          >
            {t("blogLink")}
          </Link>
        </div>

        {popular.length > 0 && (
          <div className="mt-14 text-left">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted">
              {t("popular")}
            </h2>
            <ul className="mt-4 divide-y divide-surface-2 overflow-hidden rounded-2xl border border-surface-2 bg-surface/40">
              {popular.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
                    className="group flex items-baseline justify-between gap-4 px-5 py-4 transition-colors hover:bg-surface-2/40"
                  >
                    <span className="font-medium text-ivory group-hover:text-emerald">
                      {post.title}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-sm text-muted group-hover:text-emerald"
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-center text-sm text-muted">
              <Link href="/blog" className="hover:text-emerald">
                {tb("indexTitle")}
              </Link>
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
