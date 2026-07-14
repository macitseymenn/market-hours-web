/**
 * Blog content. Each post is Markdown (rendered with react-markdown). Posts feed
 * the /blog listing, /blog/[slug] pages, Article structured data, and the
 * sitemap. Outbound links to authoritative sources (central banks, the BIS,
 * reference sites) are deliberate credibility signals.
 *
 * To add a post: append an entry below. Keep `date` in ISO (YYYY-MM-DD).
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  /** ISO publish date. */
  date: string;
  /** ISO last-updated date (optional). */
  updated?: string;
  authorSlug: string;
  tags: string[];
  /** Cover image path (replace the placeholders in /public/blog with photos). */
  cover: string;
  body: string;
};

export const POSTS: Post[] = [
  {
    slug: "when-does-the-forex-market-open-and-close",
    title: "When does the forex market open and close?",
    description:
      "A plain-English guide to the four major forex sessions — Sydney, Tokyo, London and New York — and the hours that actually matter for traders.",
    date: "2026-06-22",
    updated: "2026-07-10",
    authorSlug: "author",
    tags: ["Basics", "Sessions"],
    cover: "/blog/when-does-the-forex-market-open-and-close.svg",
    body: `The foreign-exchange market runs 24 hours a day, five days a week — but it is not equally busy at all hours. Trading follows the sun around the globe through four major regional **sessions**, and knowing when each opens is the first step to trading at the right time.

## The four sessions

Activity is concentrated in four financial centres. In standard (winter) time, their approximate hours in GMT are:

- **Sydney** — 22:00 to 07:00
- **Tokyo** — 00:00 to 09:00
- **London** — 08:00 to 17:00
- **New York** — 13:00 to 22:00

The market "opens" for the week when Sydney comes online on Sunday evening (GMT) and effectively closes when New York shuts on Friday.

## Why London dominates

London is the single largest trading centre by volume. According to the Bank for International Settlements' [Triennial Central Bank Survey](https://www.bis.org/statistics/rpfx22.htm), the United Kingdom accounts for the biggest share of global FX turnover — which is why the London open often sets the tone for the trading day.

## The hours that matter most

Liquidity — and volatility — peaks when two sessions are open at once. The **London–New York overlap** (roughly 13:00–17:00 GMT) is the busiest window of the day, because the world's two largest markets are trading simultaneously.

## A note on your timezone

Every time above is quoted in GMT for consistency, but what matters is the hour on *your* clock. Sessions also shift with daylight saving. The [live timeline on our homepage](/) converts every session to your local timezone automatically, so you never have to do the maths by hand.

*This article is for general information only and is not financial advice.*`,
  },
  {
    slug: "london-new-york-overlap",
    title: "The London–New York overlap: the busiest hours in forex",
    description:
      "Why the few hours when London and New York trade together see the deepest liquidity and the sharpest moves — and how to use them.",
    date: "2026-07-01",
    authorSlug: "author",
    tags: ["Sessions", "Strategy"],
    cover: "/blog/london-new-york-overlap.svg",
    body: `If there is one window most active traders watch, it is the **London–New York overlap** — the part of the afternoon (GMT) when the world's two largest financial centres are open at the same time.

## When it happens

In standard time the overlap runs from about **13:00 to 17:00 GMT**, when New York's morning meets London's afternoon. Because both centres handle enormous volume, the combined liquidity is greater than at any other point in the 24-hour cycle.

## Why it matters

Two things tend to rise during the overlap:

1. **Liquidity** — more participants means tighter spreads and easier order execution.
2. **Volatility** — major economic releases from the United States (such as the monthly non-farm payrolls report) often land at the start of this window, moving prices quickly.

For a primer on how session overlaps concentrate activity, [Investopedia's overview of forex trading sessions](https://www.investopedia.com/articles/forex/08/3-market-sessions.asp) is a useful reference.

## Pairs to watch

The overlap is especially relevant for pairs that involve the US dollar, the euro and the pound — **EUR/USD**, **GBP/USD** and **EUR/GBP** among them — since the underlying economies are the ones actively trading.

## Using it well

The overlap is an opportunity, not a guarantee. Higher volatility cuts both ways. Many traders use our [live market-hours tool](/) to see exactly when the overlap begins in their own timezone, and set an alert a few minutes before.

*This article is for general information only and is not financial advice. Trading foreign exchange carries risk.*`,
  },
  {
    slug: "daylight-saving-forex-hours",
    title: "How daylight saving time shifts forex session hours",
    description:
      "London, New York and Sydney all change their clocks — on different dates. Here's why your session times move twice a year, and how to stay accurate.",
    date: "2026-07-09",
    authorSlug: "author",
    tags: ["Basics", "Timezones"],
    cover: "/blog/daylight-saving-forex-hours.svg",
    body: `A common source of confusion for new traders is that session times seem to "move" a few times each year. The cause is **daylight saving time (DST)** — and because different regions change their clocks on different dates, the effect can be surprisingly messy.

## Why the hours change

Session hours are anchored to *local* time in each financial centre. London trades roughly 08:00–17:00 **local** time all year. But relative to GMT, that window shifts by an hour when the UK moves from GMT to British Summer Time. The [UK government's guidance on clock changes](https://www.gov.uk/when-do-the-clocks-change) sets the exact dates.

## The tricky part: everyone changes on different dates

- The UK and the EU spring forward on the **last Sunday of March**.
- The US springs forward earlier, on the **second Sunday of March**.
- Australia, in the southern hemisphere, does the opposite — its clocks go *back* around early April.

For a couple of weeks each spring and autumn, the usual gap between, say, London and New York is off by an hour compared with the rest of the year. That is enough to make a manually-built session chart wrong.

## How to stay accurate

The reliable approach is to compute every session from its own timezone's rules rather than from a fixed GMT table. That is exactly what our [live timeline](/) does: it reads each city's current DST state and shows the correct, up-to-the-minute hours in your own timezone — so you never trade off a stale chart.

*This article is for general information only and is not financial advice.*`,
  },
];

/** Rough reading time in minutes (~200 words/min). */
export function readingMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((p) => p.authorSlug === authorSlug);
}
