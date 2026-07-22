import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Features } from "@/components/Features";
import { SessionTimes } from "@/components/SessionTimes";
import { HowItWorks } from "@/components/HowItWorks";
import { Screenshots } from "@/components/Screenshots";
import { BlogPreview } from "@/components/BlogPreview";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { APP, FAQ, PRODUCT, PUBLISHER, SITE_URL, STEPS } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";

// WebApplication — the free browser tool that IS the hero of this page (distinct
// from the mobile app below). This is the entity searchers land on.
const webAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: PRODUCT.name,
  description: PRODUCT.description,
  applicationCategory: "FinanceApplication",
  browserRequirements: "Requires JavaScript. Runs in any modern browser.",
  operatingSystem: "Any",
  url: SITE_URL,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  featureList: [
    "Live forex session clock",
    "Automatic timezone conversion",
    "Session overlap detection",
    "Daylight-saving adjustment",
  ],
  publisher: { "@type": "Organization", name: PUBLISHER.legalName },
};

// SoftwareApplication — the companion mobile app (distinct entity from the web
// tool). aggregateRating is intentionally omitted: the app's store ratings are
// not shown on this page, and an invisible self-rating is a YMYL policy risk.
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: APP.name,
  description: APP.description,
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, iPadOS, macOS, visionOS, Android",
  url: SITE_URL,
  installUrl: APP.appStoreUrl,
  screenshot: `${SITE_URL}/400x400bb-75.webp`,
  offers: {
    "@type": "Offer",
    price: APP.price,
    priceCurrency: APP.currency,
  },
  publisher: { "@type": "Organization", name: PUBLISHER.legalName },
};

// HowTo — the "how to read the clock" steps. Aids semantic/AEO understanding.
const howToJsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How to read the forex market hours clock",
  step: STEPS.map((s) => ({
    "@type": "HowToStep",
    name: s.title,
    text: s.body,
  })),
};

// FAQPage — mirrors the on-page FAQ exactly, feeds AI Overviews / PAA.
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(webAppJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(howToJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(faqJsonLd) }}
      />
      <Hero />
      <TrustBar />
      <HowItWorks />
      <SessionTimes />
      <Features />
      <BlogPreview />
      <Faq />
      <Screenshots />
      <CtaBand />
    </>
  );
}
