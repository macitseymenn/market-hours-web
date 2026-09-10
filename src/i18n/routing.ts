import { defineRouting } from "next-intl/routing";
import { DEFAULT_LOCALE, liveLocaleCodes, type LocaleCode } from "./locales";

/**
 * i18n routing. Every locale is prefixed (`/en/...`, `/es/...`) and the root
 * `/` redirects to the default locale. Pathnames are localized per locale, so
 * e.g. the About page is `/en/about` in English and `/es/acerca-de` in Spanish.
 *
 * Blog POST slugs are localized in the content layer (each post carries a slug
 * per locale), so `/blog/[slug]` stays a shared pathname here.
 *
 * `locales` comes from the registry's date gate (`liveLocaleCodes()`), not from
 * a hand-written list: a locale scheduled for a future date is absent at
 * runtime, so `hasLocale()` rejects its URLs, `localeDetection` never sends a
 * visitor there, and it stays out of every hreflang/sitemap surface. See
 * @/i18n/locales for the full mechanism.
 *
 * At the TYPE level the union stays complete (`LocaleCode` covers every
 * registered locale, live or scheduled), which is what makes the compiler list
 * the translations a new locale still needs.
 *
 * `pathnames` entries are `Partial` per next-intl's own typing: a locale with no
 * localized slug for a route simply reuses the shared pathname.
 */
export const routing = defineRouting({
  locales: liveLocaleCodes(),
  defaultLocale: DEFAULT_LOCALE,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/author/[slug]": "/author/[slug]",
    "/about": { en: "/about", es: "/acerca-de", fr: "/a-propos" },
    "/methodology": { en: "/methodology", es: "/metodologia", fr: "/methodologie" },
    "/editorial-policy": {
      en: "/editorial-policy",
      es: "/politica-editorial",
      fr: "/politique-editoriale",
    },
    "/disclaimer": {
      en: "/disclaimer",
      es: "/aviso-de-riesgo",
      fr: "/avertissement-sur-les-risques",
    },
    "/privacy": { en: "/privacy", es: "/privacidad", fr: "/confidentialite" },
    // Privacy policy for the separate "FX Lot Size Calculator:Lotwise" app,
    // hosted here for its store listing. Same slug in every locale so the URL
    // we submit to the stores is stable.
    "/lotwise-privacy": "/lotwise-privacy",
    "/terms": { en: "/terms", es: "/terminos", fr: "/conditions-utilisation" },
    "/contact": { en: "/contact", es: "/contacto", fr: "/contact" },
  },
});

export type Locale = LocaleCode;
export type AppPathname = keyof typeof routing.pathnames;
