import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Features } from "@/components/Features";
import { SessionTimes } from "@/components/SessionTimes";
import { HowItWorks } from "@/components/HowItWorks";
import { Screenshots } from "@/components/Screenshots";
import { BlogPreview } from "@/components/BlogPreview";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { APP, FAQ, PUBLISHER, SITE_URL } from "@/lib/site";

// SoftwareApplication — the app itself, eligible for app rich results.
const appJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: APP.name,
  description: APP.description,
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, iPadOS, macOS, visionOS, Android",
  url: SITE_URL,
  installUrl: APP.appStoreUrl,
  offers: {
    "@type": "Offer",
    price: APP.price,
    priceCurrency: APP.currency,
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: APP.rating.value,
    ratingCount: APP.rating.count,
  },
  publisher: { "@type": "Organization", name: PUBLISHER.legalName },
};

// FAQPage — mirrors the on-page FAQ exactly, eligible for FAQ rich results.
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
