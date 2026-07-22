import { defineRouting } from "next-intl/routing";

/**
 * i18n routing. Every locale is prefixed (`/en/...`, `/es/...`) and the root
 * `/` redirects to the default locale. Pathnames are localized per locale, so
 * e.g. the About page is `/en/about` in English and `/es/acerca-de` in Spanish.
 *
 * Blog POST slugs are localized in the content layer (each post carries a slug
 * per locale), so `/blog/[slug]` stays a shared pathname here.
 */
export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/author/[slug]": "/author/[slug]",
    "/about": { en: "/about", es: "/acerca-de" },
    "/methodology": { en: "/methodology", es: "/metodologia" },
    "/editorial-policy": { en: "/editorial-policy", es: "/politica-editorial" },
    "/disclaimer": { en: "/disclaimer", es: "/aviso-de-riesgo" },
    "/privacy": { en: "/privacy", es: "/privacidad" },
    "/terms": { en: "/terms", es: "/terminos" },
    "/contact": { en: "/contact", es: "/contacto" },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
