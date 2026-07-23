/**
 * Analytics configuration, entirely environment-driven.
 *
 * Nothing loads unless the matching env var is set (e.g. in Netlify's site
 * settings). With no vars set, the site stays exactly as it is today: zero
 * third-party scripts, zero cookies, zero tracking, so the "collects no data"
 * promise remains true by default.
 *
 * Providers are split by privacy impact:
 *   • Cookie-based (GA4, GTM) → loaded ONLY after the visitor grants consent
 *     via the banner (GDPR / ePrivacy compliant).
 *   • No-banner (Plausible, Clicky) → loaded without a banner; disclosed in the
 *     policy. Clicky loads unconditionally on every visit.
 *
 * Set these in Netlify → Site settings → Environment variables, then redeploy:
 *   NEXT_PUBLIC_GA_ID              e.g. G-XXXXXXXXXX   (Google Analytics 4)
 *   NEXT_PUBLIC_GTM_ID            e.g. GTM-XXXXXXX    (Google Tag Manager)
 *   NEXT_PUBLIC_CLICKY_ID        e.g. 101234567      (Clicky site id)
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN e.g. forexmarkethours.app (cookieless)
 *   GOOGLE_SITE_VERIFICATION     Search Console meta token (server-only)
 */

const clean = (v: string | undefined) => (v && v.trim() ? v.trim() : undefined);

export const analytics = {
  ga: clean(process.env.NEXT_PUBLIC_GA_ID),
  gtm: clean(process.env.NEXT_PUBLIC_GTM_ID),
  clicky: clean(process.env.NEXT_PUBLIC_CLICKY_ID),
  plausible: clean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN),
} as const;

/** Cookie-setting providers, these must wait for explicit consent. */
export const hasCookieAnalytics = Boolean(analytics.ga || analytics.gtm);

/** No-banner providers, loaded on every visit without a consent banner. */
export const hasCookielessAnalytics = Boolean(
  analytics.plausible || analytics.clicky,
);

/** True when ANY analytics is configured (drives policy + trust-copy wording). */
export const analyticsEnabled = hasCookieAnalytics || hasCookielessAnalytics;

/** localStorage key holding the visitor's consent choice. */
export const CONSENT_KEY = "fmh:consent";
export type ConsentValue = "granted" | "denied";
