import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * Content-Security-Policy.
 *
 * `script-src` intentionally uses `'unsafe-inline'` rather than a hash/nonce:
 * this is a static/SSG site, and Next's App Router emits per-page, per-build
 * inline hydration scripts (`self.__next_f.push(...)`) whose bytes cannot be
 * stably hashed, while a nonce would force dynamic rendering and defeat HTML
 * CDN caching. The residual risk of `'unsafe-inline'` is near-zero here — there
 * is no injection surface (no SSR reflection of request input, no
 * `rehype-raw`, every `dangerouslySetInnerHTML` is author-controlled JSON-LD or
 * the theme-init script). CSP still adds real defense-in-depth via
 * `object-src`, `base-uri`, `frame-ancestors`, `form-action`, and by
 * constraining every fetch/connect/img/style/font origin to `'self'`.
 * Note: `<script type="application/ld+json">` is a data block and is not gated
 * by `script-src`, so the JSON-LD blocks need no special allowance.
 */
// Next's dev server (Turbopack HMR + React dev tooling) needs `'unsafe-eval'`
// and a websocket `connect-src`. Those are added ONLY in development; the
// production policy stays strict (React never uses eval() in prod).
const isDev = process.env.NODE_ENV !== "production";

// Analytics is env-driven: the CSP only opens up for the exact providers that
// are configured (via env vars at build time). With none set, the policy stays
// as strict as before — no third-party origins are allowed.
const A = {
  google: !!(process.env.NEXT_PUBLIC_GA_ID || process.env.NEXT_PUBLIC_GTM_ID),
  clicky: !!process.env.NEXT_PUBLIC_CLICKY_ID,
  plausible: !!process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN,
};
// Cloudflare Web Analytics beacon (static.cloudflareinsights.com/beacon.min.js)
// is injected at the edge by Cloudflare when Web Analytics is enabled for the
// domain — it is not loaded by this app's code, and it is cookieless (no
// consent banner needed). Always allow its script host and its RUM beacon
// endpoint (cloudflareinsights.com/cdn-cgi/rum) so the CSP never blocks the
// edge-injected beacon.
const scriptHosts: string[] = ["https://static.cloudflareinsights.com"];
const connectHosts: string[] = ["https://cloudflareinsights.com"];
const imgHosts: string[] = [];
if (A.google) {
  scriptHosts.push("https://www.googletagmanager.com");
  connectHosts.push(
    "https://www.google-analytics.com",
    "https://region1.google-analytics.com",
    "https://www.googletagmanager.com",
  );
  imgHosts.push("https://www.google-analytics.com", "https://www.googletagmanager.com");
}
if (A.clicky) {
  scriptHosts.push("https://static.getclicky.com");
  connectHosts.push("https://in.getclicky.com");
  imgHosts.push("https://static.getclicky.com", "https://in.getclicky.com");
}
if (A.plausible) {
  scriptHosts.push("https://plausible.io");
  connectHosts.push("https://plausible.io");
}
const extra = (hosts: string[]) => (hosts.length ? " " + hosts.join(" ") : "");

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}${extra(scriptHosts)}`,
  "style-src 'self' 'unsafe-inline'",
  `img-src 'self' data:${extra(imgHosts)}`,
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}${extra(connectHosts)}`,
  "media-src 'self'",
  "manifest-src 'self'",
  "worker-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: CSP },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value:
      "camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  // Never leak the framework/version banner.
  poweredByHeader: false,

  // Pin the workspace root to this project. A stray package-lock.json exists in
  // the home directory, which otherwise makes Next infer the wrong root.
  turbopack: {
    root: __dirname,
  },

  // Inline the small (<8KB) global stylesheet to remove the single
  // render-blocking CSS request from the critical path (mobile LCP win).
  experimental: {
    inlineCss: true,
  },

  images: {
    // Allow our own trusted SVG (the placeholder author avatar) through the
    // image optimizer, sandboxed so no scripts can run inside an SVG.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
