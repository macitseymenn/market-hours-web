import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SESSIONS } from "@/lib/site";
import { POSTS, type BlogLocale } from "@/content/blog";

export async function SessionTimes() {
  const t = await getTranslations("home.sessions");
  const locale = (await getLocale()) as BlogLocale;

  // Contextual internal links to the two most relevant guides, looked up by
  // their stable English slug so the correct localized slug/href resolves
  // for both locales.
  const bestTimePost = POSTS.find((p) => p.slug.en === "forex-trading-sessions-explained");
  const overlapPost = POSTS.find((p) => p.slug.en === "forex-market-hours-by-timezone");

  return (
    <section
      id="sessions"
      className="border-t border-surface-2/60 bg-surface/30 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg text-fog">{t("intro")}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-surface-2">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">{t("caption")}</caption>
            <thead>
              <tr className="bg-surface text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-5 py-3 font-medium">
                  {t("colSession")}
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  {t("colRegion")}
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  {t("colHours")}
                </th>
                <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">
                  {t("colWhy")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2">
              {SESSIONS.map((s) => {
                const isHighlight = "highlight" in s && s.highlight;
                return (
                <tr
                  key={s.city}
                  className={isHighlight ? "bg-emerald/5" : undefined}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-display font-semibold text-ivory"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {t(`cities.${s.city}`)}
                      {isHighlight && (
                        <span className="rounded-full bg-emerald px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-charcoal">
                          {t("largest")}
                        </span>
                      )}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-sm text-muted">
                    {t(`regions.${s.city}`)}
                  </td>
                  <td className="px-5 py-4 font-mono text-sm text-fog">
                    {s.gmt}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-fog sm:table-cell">
                    {t(`notes.${s.city}`)}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* The overlap, the highest-liquidity window traders care about. */}
        <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/5 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-ivory">
              {t("overlapTitle")}
            </h3>
            <span className="font-mono text-sm text-emerald">{t("overlapGmt")}</span>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fog">
            {t("overlapBody")}
          </p>
        </div>

        {/* Session-overlap diagram, a lightweight SVG so the page qualifies for
            image-pack results, with a descriptive, localized alt text. */}
        <div className="mt-8 overflow-hidden rounded-2xl border border-surface-2 bg-surface/30 p-4 sm:p-5">
          <Image
            src="/session-overlap-timeline.svg"
            alt={t("diagramAlt")}
            width={850}
            height={260}
            className="h-auto w-full"
          />
          <p className="mt-3 text-center text-xs text-muted">{t("diagramCaption")}</p>
        </div>

        {/* Dated, cited stats, concrete GEO/AEO signals with real outbound
            links (BIS turnover survey, IANA timezone database). */}
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-fog">
          {t.rich("statTurnover", {
            link: (chunks) => (
              <a
                href="https://www.bis.org/statistics/rpfx22.htm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald underline underline-offset-4 hover:text-emerald-600"
              >
                {chunks}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ),
          })}
        </p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fog">
          {t.rich("statIana", {
            link: (chunks) => (
              <a
                href="https://www.iana.org/time-zones"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald underline underline-offset-4 hover:text-emerald-600"
              >
                {chunks}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ),
          })}
        </p>

        {/* Internal linking depth, contextual links into the two most
            relevant guides, plus the methodology page (owned elsewhere). */}
        {bestTimePost && overlapPost && (
          <p className="mt-4 max-w-3xl text-sm text-fog">
            {t.rich("relatedReading", {
              bestTime: (chunks) => (
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: bestTimePost.slug[locale] },
                  }}
                  className="text-emerald underline underline-offset-4 hover:text-emerald-600"
                >
                  {chunks}
                </Link>
              ),
              overlap: (chunks) => (
                <Link
                  href={{
                    pathname: "/blog/[slug]",
                    params: { slug: overlapPost.slug[locale] },
                  }}
                  className="text-emerald underline underline-offset-4 hover:text-emerald-600"
                >
                  {chunks}
                </Link>
              ),
              methodology: (chunks) => (
                <Link
                  href="/methodology"
                  className="text-emerald underline underline-offset-4 hover:text-emerald-600"
                >
                  {chunks}
                </Link>
              ),
            })}
          </p>
        )}

        <p className="mt-6 text-xs text-muted">{t("dstNote")}</p>
      </div>
    </section>
  );
}
