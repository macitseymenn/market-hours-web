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

const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
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
