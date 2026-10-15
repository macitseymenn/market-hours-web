"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { localeMeta } from "@/i18n/locales";

/**
 * Language switcher, a dropdown that lists every locale that is currently live,
 * so registering a new language surfaces it here on its release date with no
 * change to this component. Names come from the locale registry as endonyms
 * ("Français", not "French"), which is both the convention for a language picker
 * and the reason no catalogue has to translate every other language's name.
 * Selecting
 * a language navigates to the equivalent page in that locale, respecting
 * localized slugs by reading the page's own hreflang alternates (with a
 * locale-segment-swap fallback).
 */
export function LocaleSwitcher() {
  const active = useLocale();
  const t = useTranslations("header");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    // Focus the active option when the menu opens.
    rootRef.current
      ?.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]')
      ?.focus();
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (target: string) => {
    setOpen(false);
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
      // No alternate means this page has no `target` version (a post not
      // translated yet). Swapping only the locale segment would keep this
      // language's slug and 404, so land on that locale's blog or home.
      path = /^\/[a-z]{2}\/blog\/./.test(window.location.pathname)
        ? `/${target}/blog`
        : `/${target}`;
    }
    window.location.assign(path);
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-surface-2 px-2.5 text-sm text-fog transition-colors hover:text-ivory"
      >
        {/* Accessible name is composed from the visible language text (+ this
            context prefix) so it satisfies WCAG 2.5.3 label-in-name at every
            breakpoint, rather than being overridden by a generic aria-label. */}
        <span className="sr-only">{t("language")}: </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3c2.5 2.7 2.5 15.3 0 18M12 3c-2.5 2.7-2.5 15.3 0 18" />
        </svg>
        <span className="hidden sm:inline">{localeMeta(active).name}</span>
        <span className="font-semibold uppercase sm:hidden">{active}</span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          aria-hidden="true"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <ul
          id={menuId}
          role="menu"
          aria-label={t("language")}
          className="absolute right-0 z-50 mt-2 min-w-[9rem] overflow-hidden rounded-lg border border-surface-2 bg-charcoal py-1 shadow-xl"
        >
          {routing.locales.map((l) => {
            const isActive = l === active;
            return (
              <li key={l} role="none">
                <button
                  role="menuitemradio"
                  aria-checked={isActive}
                  lang={l}
                  type="button"
                  onClick={() => go(l)}
                  className={`flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-sm transition-colors hover:bg-surface-2/40 ${
                    isActive ? "text-emerald" : "text-fog hover:text-ivory"
                  }`}
                >
                  {localeMeta(l).name}
                  {isActive && (
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="m5 12 5 5L20 7" />
                    </svg>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
