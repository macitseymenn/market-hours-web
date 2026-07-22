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
    slug: "best-time-to-trade-forex",
    title: "Best Time to Trade Forex (by Session)",
    description:
      "The best time to trade forex is the London–New York overlap, 13:00–17:00 GMT. Compare all four sessions and find the best hours for your pairs.",
    date: "2026-07-15",
    authorSlug: "author",
    tags: ["Basics", "Sessions"],
    cover: "/blog/best-time-to-trade-forex.svg",
    body: `The best time to trade forex is during the **London–New York overlap**, roughly **13:00–17:00 GMT**, when the world's two largest financial centres are both open at once. That single window sees the deepest liquidity, the tightest spreads and the sharpest price moves of the entire 24-hour trading day — but it isn't the only window worth knowing, and it isn't automatically the best time for every trader or every pair.

## Why "best time" depends on liquidity, not just hours

Forex trades 24 hours a day, five days a week, but volume is not spread evenly across that time. It follows the sun through four regional sessions — Sydney, Tokyo, Frankfurt/London and New York — and activity concentrates wherever two of those sessions overlap. More participants trading at once generally means tighter spreads and easier order execution; fewer participants means thinner, choppier conditions. That trade-off between liquidity, spreads and volatility is what "best time to trade" really comes down to.

## Comparing the four sessions

In standard (winter) time, the four major sessions run roughly:

- **Sydney** — 22:00–07:00 GMT. Opens the trading week and sets an early tone for AUD and NZD pairs, but overall volume is the lightest of the four.
- **Tokyo** — 00:00–09:00 GMT. The main Asian session, most active for JPY crosses like USD/JPY and EUR/JPY.
- **Frankfurt/London** — 07:00–17:00 GMT. London alone is the largest forex centre in the world by trading volume, according to the Bank for International Settlements' [Triennial Central Bank Survey](https://www.bis.org/statistics/rpfx22.htm), so the London open often sets the tone for the rest of the day.
- **New York** — 13:00–22:00 GMT. The second-largest session, driving USD volatility and home to major U.S. data releases.

Each session alone offers reasonable liquidity for its regional currencies. But the real activity spikes happen at the **overlaps**, where two sessions run simultaneously.

## The best hours for major pairs

Which hours matter most depends on which pairs you follow:

- **EUR/USD, GBP/USD, EUR/GBP** — the London–New York overlap (13:00–17:00 GMT) is the standout window, since it's the only time both the eurozone/UK and U.S. sessions are live together.
- **USD/JPY, EUR/JPY, GBP/JPY** — the Tokyo–London overlap, roughly 07:00–09:00 GMT, plus the tail end of the Tokyo session, tends to matter most for yen pairs.
- **AUD/USD, NZD/USD** — the Sydney–Tokyo overlap, around 00:00–07:00 GMT, is the relevant window for Australian and New Zealand dollar pairs.
- **USD/CAD** — most active during the New York session itself, particularly around U.S. and Canadian data releases.

## Liquidity, spreads and volatility: the trade-off

Higher liquidity generally means lower spreads, which is one reason the London–New York overlap gets so much attention. But that same period also tends to bring the sharpest volatility, especially around scheduled U.S. economic releases such as the monthly non-farm payrolls report. Tighter spreads and easier execution are a benefit; larger, faster price swings are a risk that cuts both ways. Trading outside the overlaps, during a single quieter session, usually means wider spreads and slower price action — sometimes preferable if you want calmer conditions, sometimes simply less opportunity.

## Finding the overlap in your own timezone

All of the hours above are quoted in GMT for consistency, but what actually matters is the time on your own clock — and that shifts twice a year as different countries move on and off daylight saving at different dates. Rather than converting each session by hand, the [live session clock on our homepage](/) shows exactly which sessions are open right now, in your own local timezone, with the overlaps highlighted automatically.

## Frequently asked questions

**Is the London–New York overlap always the best time to trade?**
It's the highest-liquidity window overall, but "best" depends on the pair. Yen and Pacific-dollar pairs often see more relevant activity during the Tokyo–London and Sydney–Tokyo overlaps instead.

**Does trading during the overlap guarantee better results?**
No. Higher liquidity typically means tighter spreads, but the same window often brings sharper volatility, which increases risk as well as opportunity.

**Do these hours change with daylight saving?**
Yes. Session times are anchored to each city's local trading hours, so their GMT equivalents shift when a country moves its clocks. Use a live, timezone-aware tool rather than a fixed table to stay accurate.

*This article is for general information only and is not financial advice. Forex Market Hours does not provide trading signals or recommendations; trading foreign exchange carries risk.*`,
  },
  {
    slug: "when-does-the-forex-market-open-and-close",
    title: "When does the forex market open and close?",
    description:
      "Forex opens Sunday 5pm ET and closes Friday 5pm ET. See the four sessions — Sydney, Tokyo, London, New York — and the hours that matter.",
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
      "The London–New York overlap (13:00–17:00 GMT) is forex's deepest-liquidity window. Why it matters and how to trade the busiest hours.",
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
