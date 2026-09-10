import { getAllPosts } from "@/content/blog";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";
import { DEFAULT_LOCALE, LOCALES, isLocaleLive, localeMeta } from "@/i18n/locales";

// /llms.txt, a plain-text guide for LLM crawlers (llmstxt.org convention).
// Generated from site content so it stays in sync. ISR rather than fully static
// so a scheduled post or locale appears here once its date arrives.
export const revalidate = 3600;

export function GET() {
  const posts = getAllPosts(DEFAULT_LOCALE);
  const live = LOCALES.filter((l) => isLocaleLive(l));

  const languages = live
    .map((l) => `- ${l.name} (\`${l.code}\`): ${SITE_URL}/${l.code}`)
    .join("\n");

  const body = `# ${PRODUCT.name}

> ${PRODUCT.description}

## Key pages
- [Live forex market-hours tool](${SITE_URL}/${DEFAULT_LOCALE}/): see which sessions (Sydney, Tokyo, Frankfurt, London, New York) are open right now, in your timezone.
- [Blog](${SITE_URL}/${DEFAULT_LOCALE}/blog): guides on forex market hours, sessions and timezones.

## Languages
Every page is published under a locale prefix. ${localeMeta(DEFAULT_LOCALE).name} is
the default; the articles listed below are linked in that locale.
${languages}

## Articles
${posts
  .map((p) => `- [${p.title}](${SITE_URL}/${DEFAULT_LOCALE}/blog/${p.slug}): ${p.description}`)
  .join("\n")}

## About
Published by ${PUBLISHER.legalName}. Forex Market Hours is a market-hours
information tool and companion iOS/Android app. It is not financial advice and
does not offer trading, deposit or withdrawal services.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
