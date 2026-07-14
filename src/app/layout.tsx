import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AlarmProvider } from "@/components/alarms/AlarmProvider";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";

// Applied before paint so the theme never flashes. An explicit saved choice wins;
// otherwise we follow the operating system's colour scheme.
const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

const TITLE = `${PRODUCT.name} — ${PRODUCT.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s — ${PRODUCT.name}`,
  },
  description: PRODUCT.description,
  applicationName: PRODUCT.name,
  authors: [{ name: PUBLISHER.displayName }],
  creator: PUBLISHER.displayName,
  publisher: PUBLISHER.legalName,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    siteName: PRODUCT.name,
    title: TITLE,
    description: PRODUCT.description,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: PRODUCT.description,
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-charcoal text-fog">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
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
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </AlarmProvider>
      </body>
    </html>
  );
}
