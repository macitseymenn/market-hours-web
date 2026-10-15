import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { DEFAULT_LOCALE, LOCALES } from "./i18n/locales";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. This handles locale
// detection, the `/` -> `/en` redirect, and rewriting localized pathnames
// (e.g. `/es/acerca-de` -> the internal `/es/about` route).
const handleI18n = createMiddleware(routing);

/**
 * Language prefixes served by an earlier version of the site on this domain.
 * Google still has them on file; without a rule they hit next-intl's
 * "unprefixed path" redirect and land on `/en/ru` etc., which 404s.
 */
const RETIRED_LOCALES = new Set(["ru", "ar", "ms", "th"]);

/** Registered locales whose `availableFrom` date has not arrived yet. */
function isScheduledLocale(code: string): boolean {
  return (
    LOCALES.some((l) => l.code === code) &&
    !(routing.locales as readonly string[]).includes(code)
  );
}

/** The localized privacy page for a live locale (`/es/privacidad`). */
function privacyPath(locale: string): string {
  const slugs = routing.pathnames["/privacy"] as Record<string, string>;
  return `/${locale}${slugs[locale] ?? "/privacy"}`;
}

/**
 * Old URLs Google keeps recrawling (Search Console "Not found (404)"), mapped
 * to where they live now. Returns null for everything else, which next-intl
 * handles as before.
 */
function legacyRedirect(pathname: string): { path: string; status: 307 | 308 } | null {
  const [, first = "", ...rest] = pathname.split("/");
  const isPrivacy = rest[0] === "privacy-policy";
  const isLive = (routing.locales as readonly string[]).includes(first);

  // `/es/privacy-policy` -> `/es/privacidad`
  if (isLive) return isPrivacy ? { path: privacyPath(first), status: 308 } : null;

  // `/ru`, `/ar/privacy-policy`, ... -> English
  if (RETIRED_LOCALES.has(first)) {
    return { path: isPrivacy ? privacyPath(DEFAULT_LOCALE) : `/${DEFAULT_LOCALE}`, status: 308 };
  }

  // `/tr` before its launch date: temporary, because the URL becomes real then.
  if (isScheduledLocale(first)) {
    return { path: isPrivacy ? privacyPath(DEFAULT_LOCALE) : `/${DEFAULT_LOCALE}`, status: 307 };
  }

  if (first === "privacy-policy") return { path: privacyPath(DEFAULT_LOCALE), status: 308 };

  // `/blog/<slug>` with no locale. The post page then maps a slug from another
  // language to the English one, so both hops are permanent.
  if (first === "blog" && rest[0]) {
    return { path: `/${DEFAULT_LOCALE}/blog/${rest.join("/")}`, status: 308 };
  }

  return null;
}

export default function proxy(request: NextRequest) {
  const legacy = legacyRedirect(request.nextUrl.pathname);
  if (legacy) {
    const url = request.nextUrl.clone();
    url.pathname = legacy.path;
    return NextResponse.redirect(url, legacy.status);
  }
  return handleI18n(request);
}

export const config = {
  // Skip API, Next internals, and any path with a file extension (sitemap.xml,
  // robots.txt, manifest.webmanifest, llms.txt, images, etc.).
  matcher: "/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)",
};
