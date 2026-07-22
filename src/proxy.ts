import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

// Next.js 16 renamed `middleware.ts` to `proxy.ts`. This handles locale
// detection, the `/` -> `/en` redirect, and rewriting localized pathnames
// (e.g. `/es/acerca-de` -> the internal `/es/about` route).
export default createMiddleware(routing);

export const config = {
  // Skip API, Next internals, and any path with a file extension (sitemap.xml,
  // robots.txt, manifest.webmanifest, llms.txt, images, etc.).
  matcher: "/((?!api|_next|_vercel|opengraph-image|.*\\..*).*)",
};
