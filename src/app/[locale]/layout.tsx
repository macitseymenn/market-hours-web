import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Script from "next/script";
import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AlarmProvider } from "@/components/alarms/AlarmProvider";
import { APP, PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";
import { routing, type Locale } from "@/i18n/routing";
import { localeMeta } from "@/i18n/locales";
import { sharedAlternates } from "@/i18n/alternates";
import { Analytics } from "@/components/analytics/Analytics";

// Applied before paint so the theme never flashes. An explicit saved choice wins;
// otherwise we follow the operating system's colour scheme.
const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

// Home title/description per locale. Front-loads the primary keyword without
// doubling the brand (the title template appends the brand on inner pages).
// Intentionally a total `Record`: registering a new locale makes this a compile
// error until its home title/description are written, which is how a language
// is prevented from launching with English metadata.
const HOME_META: Record<Locale, { title: string; description: string }> = {
  en: {
    title: "Forex Market Hours: Live Session Clock in Your Timezone",
    description:
      "See which forex sessions are open right now, Sydney, Tokyo, London & New York, live in your timezone. Free session clock, overlaps & DST. No signup.",
  },
  es: {
    title: "Horario del Mercado Forex: Reloj de Sesiones en Tu Zona Horaria",
    description:
      "Descubre qué sesiones de forex están abiertas ahora, Sídney, Tokio, Londres y Nueva York, en tu zona horaria. Reloj de sesiones gratis, sin registro.",
  },
  fr: {
    title: "Horaires du Marché Forex : Horloge des Séances en Direct",
    description:
      "Découvrez quelles séances forex sont ouvertes maintenant : Sydney, Tokyo, Londres et New York, dans votre fuseau horaire. Horloge gratuite, sans inscription.",
  },
  pt: {
    title: "Horário do Mercado Forex: Relógio de Sessões ao Vivo",
    description:
      "Veja quais sessões do forex estão abertas agora, Sydney, Tóquio, Londres e Nova York, no seu fuso horário. Relógio grátis, sobreposições e horário de verão.",
  },
  it: {
    title: "Orari del Mercato Forex: Orologio delle Sessioni Live",
    description:
      "Quali sessioni forex sono aperte ora? Sydney, Tokyo, Londra e New York nel tuo fuso orario. Orologio gratis, sovrapposizioni e ora legale. Senza registrazione.",
  },
  de: {
    title: "Forex Handelszeiten: Live-Sessionuhr in Ihrer Zeitzone",
    description:
      "Sehen Sie, welche Forex-Sessions gerade geöffnet sind: Sydney, Tokio, London und New York, live in Ihrer Zeitzone. Kostenlose Sessionuhr, ohne Anmeldung.",
  },
  tr: {
    title: "Forex Piyasa Saatleri: Saat Diliminizde Canlı Seans Saati",
    description:
      "Sidney, Tokyo, Londra ve New York: hangi forex seansları şu an açık, saat diliminizde canlı görün. Ücretsiz seans saati, çakışmalar, yaz saati. Kayıt yok.",
  },
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const meta = HOME_META[l];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: meta.title,
      template: `%s: ${PRODUCT.name}`,
    },
    description: meta.description,
    applicationName: PRODUCT.name,
    authors: [{ name: PUBLISHER.displayName }],
    creator: PUBLISHER.displayName,
    publisher: PUBLISHER.legalName,
    // Canonical + hreflang for every locale that is currently live, derived
    // from the registry so a new language needs no edit here.
    alternates: sharedAlternates(l, "/"),
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },
    openGraph: {
      type: "website",
      siteName: PRODUCT.name,
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${l}`,
      locale: localeMeta(l).ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    icons: {
      icon: [{ url: "/icon.webp", type: "image/webp" }],
      apple: [{ url: "/icon.webp" }],
    },
    category: "finance",
    // Search Console verification, set GOOGLE_SITE_VERIFICATION in the host env.
    verification: process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf3e9" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: PUBLISHER.legalName,
  alternateName: PUBLISHER.displayName,
  url: SITE_URL,
  logo: `${SITE_URL}/icon.webp`,
  email: "info@forexmarkethours.app",
  contactPoint: [
    {
      "@type": "ContactPoint",
      email: "info@forexmarkethours.app",
      contactType: "customer support",
    },
  ],
  sameAs: [APP.appStoreUrl, APP.googlePlayUrl],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: PRODUCT.name,
  url: SITE_URL,
  publisher: { "@type": "Organization", name: PUBLISHER.legalName },
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const th = await getTranslations("header");

  return (
    <html
      lang={locale}
      dir={localeMeta(locale).dir}
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-charcoal text-fog">
        {/* Theme applied before paint (no flash). Rendered via next/script with
            the `beforeInteractive` strategy, the framework-supported way to emit
            a critical inline script from a component, which also avoids React's
            "script tag inside a component won't run on the client" warning that a
            raw <script> triggers. The JSON-LD blocks below stay as native
            <script type="application/ld+json"> tags: those are inert data (not
            executed), which is exactly what Next's JSON-LD guidance recommends. */}
        <Script id="theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(websiteJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-emerald focus:px-4 focus:py-2 focus:text-charcoal"
        >
          {th("skipToContent")}
        </a>
        <NextIntlClientProvider>
          <AlarmProvider>
            <SmoothScroll>
              <Header />
              <main id="main" tabIndex={-1} className="flex-1 focus:outline-none">
                {children}
              </main>
              <Footer />
            </SmoothScroll>
          </AlarmProvider>
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
