import type { Metadata } from "next";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the Forex Market Hours team — corrections, feedback and partnership enquiries. info@forexmarkethours.app.",
  alternates: {
    canonical: "/contact",
    languages: { en: "/contact", "x-default": "/contact" },
  },
  openGraph: {
    type: "website",
    title: "Contact Us",
    description:
      "Get in touch with the Forex Market Hours team — corrections, feedback and partnership enquiries.",
    url: `${SITE_URL}/contact`,
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <header className="max-w-2xl">
        <h1 className="text-4xl font-semibold text-ivory sm:text-5xl">
          Contact Us
        </h1>
        <p className="mt-4 text-lg text-fog">
          The fastest way to reach the {PRODUCT.name} team is by email at{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>
          .
        </p>
      </header>

      <div className="article-prose mt-8">
        <h2>Email us</h2>
        <p>
          Send us a message at{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>{" "}
          and we will get back to you as soon as we can.
        </p>

        <h2>What to contact us about</h2>
        <ul>
          <li>
            <strong>Corrections</strong> — spotted an inaccurate session time,
            a broken source link, or an outdated date in an article? Let us
            know and we will review it (see our{" "}
            <a href="/editorial-policy">editorial policy</a>).
          </li>
          <li>
            <strong>Feedback</strong> — feature requests, bug reports, or
            general thoughts on the web tool or the app.
          </li>
          <li>
            <strong>Partnerships</strong> — press, collaboration, or
            integration enquiries.
          </li>
        </ul>

        <h2>Published by</h2>
        <p>
          {PRODUCT.name} is published by {PUBLISHER.displayName} (
          {PUBLISHER.legalName}), the company behind both the free web tool at{" "}
          {SITE_URL} and the companion iOS and Android apps.
        </p>
      </div>
    </article>
  );
}
