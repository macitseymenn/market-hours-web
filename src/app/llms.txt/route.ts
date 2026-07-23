import { getAllPosts } from "@/content/blog";
import { PRODUCT, PUBLISHER, SITE_URL } from "@/lib/site";

// /llms.txt, a plain-text guide for LLM crawlers (llmstxt.org convention).
// Generated from site content so it stays in sync.
export const dynamic = "force-static";

export function GET() {
  const posts = getAllPosts("en");
  const body = `# ${PRODUCT.name}

> ${PRODUCT.description}

## Key pages
- [Live forex market-hours tool](${SITE_URL}/en/): see which sessions (Sydney, Tokyo, Frankfurt, London, New York) are open right now, in your timezone.
- [Blog](${SITE_URL}/en/blog): guides on forex market hours, sessions and timezones.

## Articles
${posts
  .map((p) => `- [${p.title}](${SITE_URL}/en/blog/${p.slug}): ${p.description}`)
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
