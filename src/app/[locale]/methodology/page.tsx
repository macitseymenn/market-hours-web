import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PRODUCT, SESSIONS, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const href = "/methodology";

  return {
    title: "How We Calculate Forex Session Times",
    description:
      "Our methodology: how Forex Market Hours computes each session's open and close from live timezone rules, including daylight-saving shifts.",
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
      title: "How We Calculate Forex Session Times",
      description:
        "How Forex Market Hours computes each session's open and close from live timezone rules, including daylight-saving shifts.",
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Methodology",
      item: `${SITE_URL}/methodology`,
    },
  ],
};

export default async function MethodologyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">
          How We Calculate Forex Session Times
        </h1>
        <p className="mt-4 text-lg text-fog">
          Every session time in {PRODUCT.name} is computed live from each
          financial centre&apos;s own timezone rules, not read from a static
          GMT table — so daylight-saving shifts are always applied
          automatically.
        </p>
      </header>

      <div className="article-prose mt-8">
        <h2>The short answer</h2>
        <p>
          Each forex session is defined by the <strong>local</strong> trading
          hours of its financial centre — for example, London trades roughly
          08:00–17:00 in its own local time, all year round. We compute the
          current UTC/GMT equivalent of that local window using each city&apos;s
          IANA timezone rules, via the browser&apos;s built-in{" "}
          <code>Intl</code> API. Because the calculation always starts from
          local time, it automatically follows every daylight-saving change
          (GMT/BST, EST/EDT, AEST/AEDT and so on) without us having to publish
          a new table twice a year.
        </p>

        <h2>Standard-time session windows</h2>
        <p>
          For orientation, here are the five major sessions&apos; approximate
          windows in GMT during northern-hemisphere winter (standard time).
          These shift by an hour for centres observing daylight saving during
          their local summer:
        </p>
        <ul>
          {SESSIONS.map((s) => (
            <li key={s.city}>
              <strong>{s.city}</strong> ({s.region}) — {s.gmt} GMT
            </li>
          ))}
        </ul>

        <h2>How the calculation works</h2>
        <p>
          Rather than hard-coding an offset like &quot;GMT+1&quot; for London,
          we ask the browser what time it currently is in the{" "}
          <code>Europe/London</code> timezone (and the equivalent IANA zone
          for every other session city), using the same time-zone database
          that underpins most modern operating systems and browsers: the{" "}
          <a
            href="https://www.iana.org/time-zones"
            target="_blank"
            rel="noopener noreferrer"
          >
            IANA Time Zone Database
          </a>
          . That database is maintained precisely because daylight-saving
          rules change from country to country and year to year — so reading
          from it, instead of a fixed table we&apos;d have to update by hand,
          is what keeps the tool accurate without drifting out of date.
        </p>

        <h2>Why not a fixed GMT table?</h2>
        <p>
          Countries change their clocks on different dates. The UK and EU move
          to summer time on the last Sunday of March; the United States moves
          a few weeks earlier, on the second Sunday of March; Australia, in
          the southern hemisphere, moves in the opposite direction entirely.
          The UK government publishes the exact dates for its own clock
          changes on{" "}
          <a
            href="https://www.gov.uk/when-do-the-clocks-change"
            target="_blank"
            rel="noopener noreferrer"
          >
            gov.uk/when-do-the-clocks-change
          </a>
          . A static table quickly goes stale across one or more of these
          transitions; computing from live timezone rules does not.
        </p>

        <h2>Sources</h2>
        <ul>
          <li>
            <a
              href="https://www.bis.org/statistics/rpfx22.htm"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bank for International Settlements — Triennial Central Bank
              Survey
            </a>{" "}
            for London&apos;s position as the largest FX centre by trading
            volume.
          </li>
          <li>
            The{" "}
            <a
              href="https://www.iana.org/time-zones"
              target="_blank"
              rel="noopener noreferrer"
            >
              IANA Time Zone Database
            </a>{" "}
            for local trading-hour to UTC conversions and daylight-saving
            rules.
          </li>
          <li>
            <a
              href="https://www.gov.uk/when-do-the-clocks-change"
              target="_blank"
              rel="noopener noreferrer"
            >
              UK government clock-change guidance
            </a>{" "}
            as a reference for one major transition date.
          </li>
        </ul>

        <h2>Limitations</h2>
        <p>
          The session windows above are indicative of a normal trading day
          and exclude market holidays, half-days, and unscheduled closures,
          which individual banks and exchanges set independently. Use the{" "}
          <Link href="/">live tool on our homepage</Link> for the current,
          timezone-adjusted status, and treat any session time as general
          information rather than a guarantee that a given market is trading.
        </p>
      </div>
    </article>
  );
}
