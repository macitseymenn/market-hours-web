import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Features } from "@/components/Features";
import { SessionTimes } from "@/components/SessionTimes";
import { HowItWorks } from "@/components/HowItWorks";
import { Screenshots } from "@/components/Screenshots";
import { BlogPreview } from "@/components/BlogPreview";
import { Faq } from "@/components/Faq";
import { CtaBand } from "@/components/CtaBand";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { APP, CONTENT_DATES, PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { jsonLdScript } from "@/lib/jsonld";

// ISR: the page is still served from cache (static perf), but regenerates at
// most every 5 minutes so the server-rendered "open right now" sentence in
// <MarketStatus> never drifts far from the true session state, sessions only
// change on hour boundaries, so a 5-minute staleness window is accurate enough.
export const revalidate = 300;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const ts = await getTranslations("schema");
  const th = await getTranslations("home.how");
  const tf = await getTranslations("home.faq");
  const tsess = await getTranslations("home.sessions");
  const tblog = await getTranslations("blog");

  const steps = th.raw("steps") as { title: string; body: string }[];
  const faqItems = tf.raw("items") as { q: string; a: string }[];

  const diagramUrl = `${SITE_URL}/session-overlap-timeline.svg`;

  // WebApplication, the free browser tool that IS the hero of this page (distinct
  // from the mobile app below). This is the entity searchers land on.
  // datePublished/dateModified give AI Overviews and Google a freshness signal;
  // `modified` is a manual editorial date (see CONTENT_DATES), bumped whenever
  // the homepage copy or session data is materially reviewed.
  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: PRODUCT.name,
    description: ts("webAppDescription"),
    applicationCategory: "FinanceApplication",
    browserRequirements: "Requires JavaScript. Runs in any modern browser.",
    operatingSystem: "Any",
    url: SITE_URL,
    datePublished: CONTENT_DATES.published,
    dateModified: CONTENT_DATES.modified,
    image: diagramUrl,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: ts.raw("featureList") as string[],
    publisher: { "@type": "Organization", name: PUBLISHER.legalName },
  };

  // ImageObject, the session-overlap timeline diagram, so the page is
  // eligible for Google's image-pack results alongside the text result.
  const imageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: diagramUrl,
    url: diagramUrl,
    description: tsess("diagramAlt"),
    representativeOfPage: true,
  };

  // BreadcrumbList, Home continuity for the site's top-level entry point
  // (every inner page already has one; the homepage was missing it).
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: tblog("breadcrumbHome"),
        item: `${SITE_URL}/${locale}`,
      },
    ],
  };

  // SoftwareApplication, the companion mobile app (distinct entity from the web
  // tool). aggregateRating is intentionally omitted: the app's store ratings are
  // not shown on this page, and an invisible self-rating is a YMYL policy risk.
  const appJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: APP.name,
    description: ts("appDescription"),
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

  // HowTo, the "how to read the clock" steps. Aids semantic/AEO understanding.
  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: ts("howToName"),
    step: steps.map((s) => ({
      "@type": "HowToStep",
      name: s.title,
      text: s.body,
    })),
  };

  // FAQPage, mirrors the on-page FAQ exactly, feeds AI Overviews / PAA.
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(imageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(breadcrumbJsonLd) }}
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
