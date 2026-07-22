import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PRODUCT, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const href = "/editorial-policy";

  return {
    title: "Editorial Standards & Accuracy Policy",
    description:
      "How we research, source and review forex market-hours content — our accuracy, corrections and non-advice editorial standards.",
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
      title: "Editorial Standards & Accuracy Policy",
      description:
        "How we research, source and review forex market-hours content — our accuracy, corrections and non-advice editorial standards.",
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
      name: "Editorial Policy",
      item: `${SITE_URL}/editorial-policy`,
    },
  ],
};

export default async function EditorialPolicyPage({
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
          Editorial Standards & Accuracy Policy
        </h1>
        <p className="mt-4 text-lg text-fog">
          Forex is a subject where accuracy matters. This page explains how we
          research, write and correct the content on {PRODUCT.name}, and what
          we deliberately do not do.
        </p>
      </header>

      <div className="article-prose mt-8">
        <h2>How we research and source content</h2>
        <p>
          Our articles and reference pages are built from primary and
          official sources wherever possible: central-bank and monetary
          authority publications, the{" "}
          <a
            href="https://www.bis.org/statistics/rpfx22.htm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bank for International Settlements&apos; Triennial Central Bank
            Survey
          </a>{" "}
          of global FX turnover, official government guidance such as the
          UK&apos;s{" "}
          <a
            href="https://www.gov.uk/when-do-the-clocks-change"
            target="_blank"
            rel="noopener noreferrer"
          >
            clock-change pages
          </a>
          , and the{" "}
          <a
            href="https://www.iana.org/time-zones"
            target="_blank"
            rel="noopener noreferrer"
          >
            IANA Time Zone Database
          </a>{" "}
          that also powers the tool itself. Where we cite a figure or claim,
          we link to the source rather than restating it as an unattributed
          fact.
        </p>

        <h2>How we review for accuracy</h2>
        <p>
          Before publishing, session-hours content is checked against the
          same timezone data our live tool uses (see our{" "}
          <Link href="/methodology">methodology page</Link>), so the written
          guides and the interactive clock never contradict each other.
          Content is periodically re-checked as clock-change dates and market
          conventions are confirmed each year.
        </p>

        <h2>Corrections</h2>
        <p>
          If we find — or are told about — an inaccuracy, we correct it and,
          for substantial changes, update the article&apos;s &quot;last
          updated&quot; date. We would rather fix a mistake quickly than leave
          it live for the sake of appearances.
        </p>

        <h2>What we do not do</h2>
        <p>
          {PRODUCT.name} does not provide financial advice, trading signals,
          or buy/sell recommendations of any kind, and none of our content
          should be read as a suggestion to trade a specific instrument at a
          specific time. We publish general, educational information about
          how forex sessions and their hours work — see our full{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link>.
        </p>

        <h2>Report an inaccuracy</h2>
        <p>
          Spotted something wrong — a session time, a source link, a date? Tell
          us at{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>{" "}
          and we will look into it.
        </p>
      </div>
    </article>
  );
}
