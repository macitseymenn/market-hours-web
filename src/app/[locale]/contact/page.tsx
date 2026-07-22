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
  const href = "/contact";

  return {
    title: "Contact Us",
    description:
      "Get in touch with the Forex Market Hours team — corrections, feedback and partnership enquiries. info@forexmarkethours.app.",
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
      title: "Contact Us",
      description:
        "Get in touch with the Forex Market Hours team — corrections, feedback and partnership enquiries.",
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    { "@type": "ListItem", position: 2, name: "Contact", item: `${SITE_URL}/contact` },
  ],
};

export default async function ContactPage({
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
            <Link href="/editorial-policy">editorial policy</Link>).
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
