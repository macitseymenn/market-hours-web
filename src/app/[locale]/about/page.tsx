import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { Link, getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const href = "/about";

  return {
    title: { absolute: `About ${PRODUCT.name}` },
    description:
      "Who builds Forex Market Hours, why we made a free live session clock, and how we keep session times accurate. By Hunters Group Software.",
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
      title: `About ${PRODUCT.name}`,
      description:
        "Who builds Forex Market Hours, why we made a free live session clock, and how we keep session times accurate.",
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
  ],
};

export default async function AboutPage({
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
          About {PRODUCT.name}
        </h1>
        <p className="mt-4 text-lg text-fog">
          {PRODUCT.name} is a free, live forex session clock built by{" "}
          {PUBLISHER.displayName} — a software company that makes small,
          focused tools instead of broad financial products.
        </p>
      </header>

      <div className="article-prose mt-8">
        <h2>Who we are</h2>
        <p>
          {PUBLISHER.displayName} ({PUBLISHER.legalName}) is a software
          company. We build and maintain {PRODUCT.name} — the web tool at{" "}
          {SITE_URL} and its companion iOS and Android apps — as a single,
          focused product: a market-hours utility for people who trade or
          follow the foreign-exchange market. We are not a bank, a brokerage,
          or an investment firm.
        </p>

        <h2>Why we built this</h2>
        <p>
          Forex trading runs 24 hours a day across five days a week, split
          across regional sessions in Sydney, Tokyo, Frankfurt, London and New
          York. Working out which of those sessions is open right now, in
          your own timezone, usually meant converting GMT by hand and
          re-checking it whenever a country&rsquo;s clocks changed for daylight
          saving. We built {PRODUCT.name} so that conversion happens
          automatically, all the time, for free.
        </p>

        <h2>What Forex Market Hours is — and isn&apos;t</h2>
        <p>
          {PRODUCT.name} is a market-hours utility. It shows when the major
          forex sessions open, close and overlap, converted to your local
          timezone. It is <strong>not</strong> a broker, a financial adviser,
          or a signals service, and it does not offer trading, deposit or
          withdrawal services. Nothing on this site is personalised financial
          advice — see our{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link> for the
          full detail.
        </p>

        <h2>How we keep it accurate</h2>
        <p>
          Every session time is computed from each financial centre&apos;s own
          timezone rules rather than a fixed table, so daylight-saving shifts
          are applied automatically. We explain exactly how that works, and
          the sources we rely on, on our{" "}
          <Link href="/methodology">methodology page</Link>.
        </p>

        <h2>The free web tool and app</h2>
        <p>
          The web tool at {SITE_URL} runs entirely in your browser, with no
          sign-up and no ads. It is paired with a free iOS and Android app
          that adds Home Screen widgets, an economic calendar and session
          alerts, for people who want the same live clock without a browser
          tab open.
        </p>

        <h2>Get in touch</h2>
        <p>
          Questions, corrections or partnership enquiries are welcome at{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>
          , or see our <Link href="/contact">contact page</Link>.
        </p>
      </div>
    </article>
  );
}
