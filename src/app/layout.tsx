import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AlarmProvider } from "@/components/alarms/AlarmProvider";
import { APP, PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";

// Applied before paint so the theme never flashes. An explicit saved choice wins;
// otherwise we follow the operating system's colour scheme.
const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

// Homepage title/description. Front-loads the primary keyword without doubling
// the brand (the title template appends the brand on other pages, not here).
const HOME_TITLE = "Forex Market Hours — Live Session Clock in Your Timezone";
const HOME_DESC =
  "See which forex sessions are open right now — Sydney, Tokyo, London & " +
  "New York — live in your timezone. Free session clock, overlaps & DST. No signup.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s — ${PRODUCT.name}`,
  },
  description: HOME_DESC,
  applicationName: PRODUCT.name,
  authors: [{ name: PUBLISHER.displayName }],
  creator: PUBLISHER.displayName,
  publisher: PUBLISHER.legalName,
  // Launch: English only. Self-referential en + x-default; no Spanish alternate
  // is emitted until /es pages return 200 (a 404-ing hreflang is worse than none).
  alternates: {
    canonical: "/",
    languages: { en: "/", "x-default": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: PRODUCT.name,
    title: HOME_TITLE,
    description: HOME_DESC,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESC,
  },
  icons: {
    icon: [{ url: "/icon.webp", type: "image/webp" }],
    apple: [{ url: "/icon.webp" }],
  },
  category: "finance",
};

export const viewport = {
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbf3e9" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1714" },
  ],
};

// Organization + WebSite structured data — publisher identity (authoritativeness)
// and site-level metadata that Google uses for knowledge/rich results.
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the theme-init script adds `.dark` to <html>
    // before hydration, so this element's className legitimately differs from
    // the server markup. This suppresses only that one expected attribute diff.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-charcoal text-fog">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
          Skip to content
        </a>
        <AlarmProvider>
          <SmoothScroll>
            <Header />
            <main
              id="main"
              tabIndex={-1}
              className="flex-1 focus:outline-none"
            >
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </AlarmProvider>
      </body>
    </html>
  );
}
