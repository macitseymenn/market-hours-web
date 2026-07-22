import type { Metadata } from "next";
import Link from "next/link";
import { DISCLAIMER, PRODUCT, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Risk & Trading Disclaimer",
  description:
    "Forex Market Hours is a market-hours tool only — not financial advice and not a broker. Read our full risk and trading disclaimer.",
  alternates: {
    canonical: "/disclaimer",
    languages: { en: "/disclaimer", "x-default": "/disclaimer" },
  },
  openGraph: {
    type: "website",
    title: "Risk & Trading Disclaimer",
    description:
      "Forex Market Hours is a market-hours tool only — not financial advice and not a broker.",
    url: `${SITE_URL}/disclaimer`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Disclaimer",
      item: `${SITE_URL}/disclaimer`,
    },
  ],
};

export default function DisclaimerPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">
          Risk & Trading Disclaimer
        </h1>
        <p className="mt-4 text-lg text-fog">{DISCLAIMER}</p>
      </header>

      <div className="article-prose mt-8">
        <h2>Not financial advice</h2>
        <p>
          Nothing on {PRODUCT.name} — including the web tool, the mobile app,
          the blog, or any other page on this site — constitutes financial,
          investment, trading, tax or legal advice. We do not recommend
          buying, selling, or holding any currency, security, or other
          financial instrument. Any decision to trade is yours alone, and you
          should seek independent, licensed advice before making one.
        </p>

        <h2>Not a broker</h2>
        <p>
          {PRODUCT.name} is a market-hours utility. It does not execute
          trades, hold client funds, or offer any deposit or withdrawal
          service. We are not a broker, exchange, or payment provider, and we
          never ask for your trading account credentials or funds.
        </p>

        <h2>Trading foreign exchange carries risk</h2>
        <p>
          Foreign-exchange trading involves substantial risk of loss and is
          not suitable for every investor. Past performance of any market or
          strategy is not indicative of future results. If you choose to
          trade, do so only through a properly regulated broker and only with
          money you can afford to lose.
        </p>

        <h2>Session times are indicative</h2>
        <p>
          The session hours shown by {PRODUCT.name} are computed from each
          financial centre&apos;s timezone rules and follow daylight-saving
          changes automatically — see our{" "}
          <Link href="/methodology">methodology</Link> for how. They are
          provided for general orientation, reflect a normal trading day, and
          exclude market holidays and unscheduled closures. Always confirm
          exact hours with your broker or exchange before relying on them for
          a trading decision.
        </p>

        <h2>Questions</h2>
        <p>
          If anything here is unclear, contact us at{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>
          .
        </p>
      </div>
    </article>
  );
}
