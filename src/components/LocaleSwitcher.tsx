"use client";

import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";

/**
 * Language switcher. Navigates to the equivalent page in the target locale,
 * respecting localized slugs (e.g. /es/acerca-de -> /en/about, and blog posts
 * whose slugs differ per locale) by reading the page's own hreflang alternates,
 * which are already emitted correctly on every route. Falls back to swapping the
 * leading /xx locale segment if no alternate is found.
 */
export function LocaleSwitcher() {
  const active = useLocale();
  const t = useTranslations("header");

  const go = (target: string) => {
    if (target === active) return;
    let path: string | null = null;
    const link = document.querySelector<HTMLLinkElement>(
      `link[rel="alternate"][hreflang="${target}"]`,
    );
    if (link?.href) {
      try {
        const u = new URL(link.href);
        path = u.pathname + u.search + u.hash;
      } catch {
        /* ignore malformed href */
      }
    }
    if (!path) {
      path = window.location.pathname.replace(
        /^\/[a-z]{2}(?=\/|$)/,
        `/${target}`,
      );
    }
    // Full navigation so the document lang, metadata and all server components
    // re-render in the new locale.
    window.location.assign(path);
  };

  return (
    <div
      role="group"
      aria-label={t("language")}
      className="flex items-center rounded-lg border border-surface-2 p-0.5 text-xs font-semibold"
    >
      {routing.locales.map((l) => {
        const isActive = l === active;
        return (
          <button
            key={l}
            type="button"
            lang={l}
            onClick={() => go(l)}
            aria-current={isActive ? "true" : undefined}
            aria-label={t("languageNames." + l)}
            title={t("languageNames." + l)}
            className={
              isActive
                ? "rounded-md bg-emerald px-2 py-1 text-charcoal"
                : "rounded-md px-2 py-1 text-muted transition-colors hover:text-ivory"
            }
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
