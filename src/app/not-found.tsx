import type { Metadata } from "next";
import "./globals.css";
import { DEFAULT_LOCALE } from "@/i18n/locales";
import { PRODUCT, SITE_URL } from "@/lib/site";

/**
 * App-wide 404 fallback, for requests that never reach a locale prefix (paths
 * the i18n proxy skips: anything containing a dot, `/api`, `/_next`). Anything
 * under a locale is answered by the localized `[locale]/not-found.tsx` instead.
 *
 * This project's only root layout lives under the `[locale]` dynamic segment, a
 * shape Next explicitly allows for i18n. The consequence is that a root-level
 * 404 has no root layout to compose with, so this file brings its own document
 * and stylesheet, and it cannot use translations (there is no request locale at
 * this point, and no reliable way to know the visitor's language). It links to
 * the site root and lets the proxy choose the locale from there.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `Page not found: ${PRODUCT.name}`,
  description: "The page you are looking for does not exist.",
};

// Applied before paint so the fallback matches the theme chosen elsewhere on
// the site instead of flashing light.
const themeInitScript = `try{var t=localStorage.getItem('theme');if(t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}`;

export default function RootNotFound() {
  return (
    <html lang={DEFAULT_LOCALE} dir="ltr" className="h-full antialiased">
      <body className="min-h-full bg-charcoal text-fog">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-5 py-20 text-center">
          <p
            aria-hidden="true"
            className="font-mono text-6xl font-semibold leading-none tracking-tight text-emerald/25"
          >
            404
          </p>
          <h1 className="mt-6 text-3xl font-semibold leading-tight text-ivory">
            This page doesn’t exist
          </h1>
          <p className="mt-4 text-lg text-fog">
            The link may be out of date, or the page may have moved. The live forex
            session clock is still right here.
          </p>
          <a
            href={`/${DEFAULT_LOCALE}`}
            className="mt-8 inline-flex items-center rounded-full border border-emerald/40 bg-emerald/10 px-5 py-2.5 text-sm font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald/15"
          >
            Open the live session clock
          </a>
        </main>
      </body>
    </html>
  );
}
