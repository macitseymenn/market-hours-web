import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms governing use of the Forex Market Hours web tool and mobile apps.",
  alternates: {
    canonical: "/terms",
    languages: { en: "/terms", "x-default": "/terms" },
  },
  openGraph: {
    type: "website",
    title: "Terms of Use",
    description:
      "The terms governing use of the Forex Market Hours web tool and mobile apps.",
    url: `${SITE_URL}/terms`,
  },
};

const LAST_UPDATED = "2026-07-22";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Terms of Use", item: `${SITE_URL}/terms` },
  ],
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">
          Terms of Use
        </h1>
        <p className="mt-4 text-lg text-fog">
          These terms govern your use of the {PRODUCT.name} web tool at{" "}
          {SITE_URL} and its companion iOS and Android apps, published by{" "}
          {PUBLISHER.displayName}.
        </p>
      </header>

      <div className="article-prose mt-8">
        <p>Last updated: {formatDate(LAST_UPDATED)}.</p>
        <blockquote>
          This is a general terms-of-use template intended to describe how
          the service actually works. It is not a substitute for legal
          advice — please have it reviewed by qualified counsel before
          relying on it for any dispute or compliance purpose.
        </blockquote>

        <h2>1. Acceptance of these terms</h2>
        <p>
          By accessing or using {PRODUCT.name} (the &quot;Service&quot;), you
          agree to these Terms of Use. If you do not agree, please do not use
          the Service.
        </p>

        <h2>2. Description of the service</h2>
        <p>
          {PRODUCT.name} is a market-hours utility that displays the open,
          close and overlap times of the major forex trading sessions,
          converted to your local timezone, along with related informational
          content. The Service is provided free of charge, with no account
          required for the web tool.
        </p>

        <h2>3. Not financial advice</h2>
        <p>
          The Service is provided for general, informational purposes only.
          It is not financial, investment, trading, tax or legal advice, and
          nothing in the Service should be treated as a recommendation to buy,
          sell, or hold any instrument. See our full{" "}
          <Link href="/disclaimer">risk and trading disclaimer</Link>.
        </p>

        <h2>4. No warranty of accuracy for trading decisions</h2>
        <p>
          While we make reasonable efforts to keep session times and
          associated content accurate (see our{" "}
          <Link href="/methodology">methodology</Link> and{" "}
          <Link href="/editorial-policy">editorial policy</Link>), the
          Service is provided &quot;as is&quot; and &quot;as available,&quot;
          without warranties of any kind, express or implied, including
          accuracy, completeness, or fitness for a particular purpose. You
          should independently verify any time-sensitive information before
          acting on it.
        </p>

        <h2>5. Acceptable use</h2>
        <p>
          You agree not to misuse the Service, including by attempting to
          disrupt it, scraping it at a disproportionate rate, reverse
          engineering the app beyond what applicable law permits, or using it
          for any unlawful purpose.
        </p>

        <h2>6. Intellectual property</h2>
        <p>
          The Service, including its design, text, graphics, and underlying
          code, is owned by {PUBLISHER.displayName} or its licensors and is
          protected by applicable intellectual-property laws. You may use the
          Service for personal, non-commercial purposes; you may not
          reproduce, redistribute, or create derivative products from it
          without our written permission.
        </p>

        <h2>7. Third-party links and app stores</h2>
        <p>
          The Service links to the Apple App Store and Google Play, and to
          third-party sources cited in our content. Your use of those
          platforms is governed by their own terms, which we do not control.
        </p>

        <h2>8. Limitation of liability</h2>
        <p>
          To the fullest extent permitted by law, {PUBLISHER.displayName}
          shall not be liable for any indirect, incidental, or consequential
          damages, including trading losses, arising from your use of, or
          inability to use, the Service.
        </p>

        <h2>9. Governing entity</h2>
        <p>
          The Service is published by {PUBLISHER.displayName} (
          {PUBLISHER.legalName}).
        </p>

        <h2>10. Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Continued use of the
          Service after a change constitutes acceptance of the updated terms.
        </p>

        <h2>11. Contact</h2>
        <p>
          Questions about these terms can be sent to{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>
          .
        </p>
      </div>
    </article>
  );
}
