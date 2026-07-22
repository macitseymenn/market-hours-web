import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/format";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const href = "/privacy";

  return {
    title: "Privacy Policy",
    description:
      "How Forex Market Hours handles data. The web tool runs in your browser; we collect no personal trading data.",
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
      title: "Privacy Policy",
      description:
        "How Forex Market Hours handles data. The web tool runs in your browser; we collect no personal trading data.",
      url: `${SITE_URL}${getPathname({ locale: l, href })}`,
    },
  };
}

const LAST_UPDATED = "2026-07-22";

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
    {
      "@type": "ListItem",
      position: 2,
      name: "Privacy Policy",
      item: `${SITE_URL}/privacy`,
    },
  ],
};

export default async function PrivacyPage({
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
          Privacy Policy
        </h1>
        <p className="mt-4 text-lg text-fog">
          Short version: {PRODUCT.name} runs in your browser, collects no
          personal data, and does not track you.
        </p>
      </header>

      <div className="article-prose mt-8">
        <p>Last updated: {formatDate(LAST_UPDATED)}.</p>

        <h2>The web tool runs in your browser</h2>
        <p>
          {PRODUCT.name} at {SITE_URL} is a client-side tool: the live
          session clock, timezone conversion and calculations all run on your
          own device. We do not operate any backend that logs which sessions
          you view, what timezone you use, or how you use the site.
        </p>

        <h2>We collect no personal data</h2>
        <p>
          We run no analytics, no advertising trackers, and set no tracking
          cookies on this site. We do not collect names, email addresses, IP
          addresses, or any other personal or trading data through the web
          tool, and we have nothing of yours to sell or share.
        </p>

        <h2>Local storage: theme and alarms only</h2>
        <p>
          The only data the site stores is kept in your own browser&apos;s{" "}
          <code>localStorage</code> and never sent to us:
        </p>
        <ul>
          <li>your light/dark theme preference; and</li>
          <li>
            any session alarms you choose to set, so they persist between
            visits.
          </li>
        </ul>
        <p>
          Clearing your browser&apos;s site data removes this information
          completely. It never leaves your device.
        </p>

        <h2>Notifications and audio</h2>
        <p>
          If you enable a session alarm, the site uses your browser&apos;s
          native Notifications permission and Web Audio API to alert you
          locally. These only activate if you explicitly opt in, and no
          alarm data is transmitted anywhere.
        </p>

        <h2>The mobile app</h2>
        <p>
          The {PRODUCT.name} iOS and Android app, per its App Store and
          Google Play listings, collects no data from its users.
        </p>

        <h2>Third-party links</h2>
        <p>
          This site links to the Apple App Store and Google Play to download
          the app, and to external sources we cite in our articles. Those
          third-party sites have their own privacy policies, which we
          encourage you to review; we are not responsible for their content or
          practices.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If this policy changes, we will update this page and the
          &quot;last updated&quot; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to{" "}
          <a href="mailto:info@forexmarkethours.app">
            info@forexmarkethours.app
          </a>
          . {PRODUCT.name} is published by {PUBLISHER.displayName}.
        </p>
      </div>
    </article>
  );
}
