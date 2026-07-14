/**
 * Single source of truth for the Forex Market Hours web tool + app.
 * Content here feeds BOTH the visible UI and the structured data (JSON-LD),
 * so the two can never drift apart. Change copy, links, or session data here.
 */

// Swap this one constant for the real production domain when it's ready.
export const SITE_URL = "https://forexmarkethours.app";

/** The product: a free web tool (the star) with companion mobile apps. */
export const PRODUCT = {
  name: "Forex Market Hours",
  shortName: "Forex Market Hours",
  tagline: "Live forex market hours in your timezone",
  // Tool-first description used for meta + hero support copy.
  description:
    "A free live tool that shows which forex sessions — Sydney, Tokyo, " +
    "Frankfurt, London and New York — are open right now, in your own " +
    "timezone. See session overlaps, opening times and daylight-saving shifts " +
    "at a glance, right in your browser. Also available as an iOS and Android app.",
} as const;

export const APP = {
  name: "Forex Market Hours: London",
  shortName: "Forex Market Hours",
  tagline: "Live Session Clock & Calendar",
  // Description of the mobile app specifically (used for app JSON-LD + app CTA).
  description:
    "The Forex Market Hours app shows exactly when the London, New York, Tokyo, " +
    "Sydney and Frankfurt forex sessions open and close in your own timezone — " +
    "with a live 24-hour session clock, widgets, session alerts and an economic " +
    "calendar. A market-tracking utility, not a broker.",
  appStoreUrl:
    "https://apps.apple.com/tr/app/forex-market-hours-london/id6758207849",
  // TODO: replace with the real Google Play listing URL when published.
  googlePlayUrl: "https://play.google.com/store/apps/details?id=com.huntersgroup.forexmarkethours",
  price: "0",
  currency: "USD",
  rating: { value: "5.0", count: "12" },
  platforms: ["iPhone", "iPad", "Mac", "Apple Vision Pro", "Android"],
} as const;

export const PUBLISHER = {
  legalName: "HUNTERS GROUP SOFTWARE LIMITED SIRKETI",
  displayName: "Hunters Group Software",
} as const;

/**
 * Primary navigation. Section links are absolute (`/#id`) so they work from any
 * page (blog, author) — on the homepage they still smooth-scroll via Lenis.
 */
export const NAV = [
  { label: "Live hours", href: "/#top" },
  { label: "Sessions", href: "/#sessions" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
  { label: "Get the app", href: "/#apps" },
] as const;

/** Feature cards — each has an icon key resolved in the Features component. */
export const FEATURES = [
  {
    icon: "clock",
    title: "Live 24-hour session clock",
    body: "An interactive circular clock maps the whole trading day so you can see which markets are open at a glance.",
  },
  {
    icon: "widget",
    title: "Home & Lock Screen widgets",
    body: "Keep the next session open right on your Home and Lock Screen, updating in real time without opening the app.",
  },
  {
    icon: "calendar",
    title: "Live economic calendar",
    body: "Track high-impact releases — NFP, CPI, GDP, PMI and central-bank rate decisions — before they move the market.",
  },
  {
    icon: "bell",
    title: "Session & news alerts",
    body: "Get a heads-up 15 minutes before a session opens, plus alerts for the economic events that matter to you.",
  },
  {
    icon: "globe",
    title: "Automatic timezone",
    body: "Every time is converted to your local timezone and adjusted for GMT/BST, so there's no manual math.",
  },
  {
    icon: "moon",
    title: "Dark mode & battery-friendly",
    body: "A dark interface built for long analysis sessions, designed to stay light on your battery.",
  },
] as const;

/**
 * Major forex trading sessions.
 * `openUTC`/`closeUTC` are whole-hour windows in UTC (GMT) during standard time,
 * used to drive the live clock and open/closed status. The app itself converts
 * everything to the user's timezone and adjusts for daylight saving; we surface
 * the standard-time windows here for orientation (see the DST note in the UI).
 * `color` is the session's colour on the live clock and legend.
 */
export const SESSIONS = [
  {
    city: "Sydney",
    region: "Australia",
    gmt: "22:00 – 07:00",
    openUTC: 22,
    closeUTC: 7,
    color: "#4e6e81",
    note: "Opens the trading week; sets early AUD and NZD tone.",
  },
  {
    city: "Tokyo",
    region: "Japan",
    gmt: "00:00 – 09:00",
    openUTC: 0,
    closeUTC: 9,
    color: "#8a6d9b",
    note: "The Asian session; most active for JPY pairs.",
  },
  {
    city: "Frankfurt",
    region: "Germany",
    gmt: "07:00 – 16:00",
    openUTC: 7,
    closeUTC: 16,
    color: "#c6a24c",
    note: "Opens Europe an hour before London; key for EUR pairs.",
  },
  {
    city: "London",
    region: "United Kingdom",
    gmt: "08:00 – 17:00",
    openUTC: 8,
    closeUTC: 17,
    color: "#b5654a",
    note: "The largest forex session by volume worldwide.",
    highlight: true,
  },
  {
    city: "New York",
    region: "United States",
    gmt: "13:00 – 22:00",
    openUTC: 13,
    closeUTC: 22,
    color: "#5f8060",
    note: "Drives USD volatility; overlaps London mid-afternoon.",
  },
] as const;

export type Session = (typeof SESSIONS)[number];

/** True when UTC fractional hour `t` (0–24) falls inside the session window. */
export function isSessionOpen(session: Session, t: number): boolean {
  const { openUTC, closeUTC } = session;
  return openUTC < closeUTC
    ? t >= openUTC && t < closeUTC
    : t >= openUTC || t < closeUTC; // wraps past midnight (e.g. Sydney)
}

/** The high-liquidity overlap traders care about most. */
export const OVERLAP = {
  title: "London – New York overlap",
  gmt: "≈ 13:00 – 17:00 GMT",
  body: "When London and New York are open together, the two largest markets trade at once — typically the deepest liquidity and sharpest moves of the day.",
} as const;

/** How to use the web tool — no download needed. */
export const STEPS = [
  {
    title: "Set your timezone",
    body: "The timeline opens in your local timezone automatically. Switch it to compare any market from anywhere in the world.",
  },
  {
    title: "Read the open markets",
    body: "Each coloured bar is a session's trading window. The moving line is now — wherever it crosses a bar, that market is open.",
  },
  {
    title: "Plan around the overlaps",
    body: "Spot the London–New York overlap and other high-liquidity windows at a glance, then time your trading around them.",
  },
] as const;

/** FAQ — mirrored 1:1 into FAQPage structured data. */
export const FAQ = [
  {
    q: "Is this free to use?",
    a: "Yes. The Forex Market Hours web tool is completely free, with no ads and no sign-up. The companion iOS and Android apps are free too.",
  },
  {
    q: "Do I need to create an account?",
    a: "No account is required. Open the page and the live market hours appear instantly in your timezone.",
  },
  {
    q: "Does it give trading signals or financial advice?",
    a: "No. It is a market-hours tool that shows when sessions open and close. It does not provide financial advice, trading signals, or any trading, deposit or withdrawal services.",
  },
  {
    q: "Which forex sessions does it show?",
    a: "The major sessions — Sydney, Tokyo, Frankfurt, London and New York — plus the high-volume session overlaps where volatility tends to peak.",
  },
  {
    q: "Are the times correct for daylight saving?",
    a: "Yes. Every market's hours are computed from its own timezone rules, so daylight-saving shifts (GMT/BST, EST/EDT, and so on) are always applied automatically.",
  },
  {
    q: "Is there a mobile app?",
    a: "Yes. Forex Market Hours is available on the App Store (iPhone, iPad, Mac, Apple Vision Pro) and on Google Play for Android, adding widgets, an economic calendar and alerts 15 minutes before each session opens.",
  },
  {
    q: "Does it collect my data?",
    a: "No. The tool runs in your browser and the app collects no data.",
  },
] as const;

export const DISCLAIMER =
  "Forex Market Hours is a market-hours tool only. It does not provide financial " +
  "advice and does not offer trading, deposit, or withdrawal services. Trading " +
  "foreign exchange carries risk. Session times are provided for general " +
  "information and follow daylight-saving changes.";
