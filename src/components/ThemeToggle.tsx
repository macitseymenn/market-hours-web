"use client";

import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";

/**
 * Light/Dark theme switch. By default the site follows the operating system's
 * colour scheme; once the user toggles, their explicit choice is remembered in
 * localStorage (and applied before paint by an inline script in the layout, so
 * there's no flash).
 *
 * The current theme is read from the <html> `dark` class via useSyncExternalStore
 *, the React-sanctioned way to read client-only/external state without a
 * setState-in-effect. The server snapshot is Light, then the client corrects it
 * on mount.
 */
function subscribe(onChange: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const onSystem = () => {
    let explicit: string | null = null;
    try {
      explicit = localStorage.getItem("theme");
    } catch {
      /* ignore */
    }
    // Only follow the OS while the user hasn't made an explicit choice.
    if (explicit === "light" || explicit === "dark") return;
    document.documentElement.classList.toggle("dark", mq.matches);
    onChange();
  };
  mq.addEventListener("change", onSystem);
  window.addEventListener("themechange", onChange);
  return () => {
    mq.removeEventListener("change", onSystem);
    window.removeEventListener("themechange", onChange);
  };
}

const isDark = () => document.documentElement.classList.contains("dark");

export function ThemeToggle() {
  const t = useTranslations("theme");
  const dark = useSyncExternalStore(subscribe, isDark, () => false);
  const label = dark ? t("switchToLight") : t("switchToDark");

  const toggle = () => {
    const root = document.documentElement;
    const next = !root.classList.contains("dark");
    root.classList.add("theme-transition");
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* ignore private-mode storage errors */
    }
    window.dispatchEvent(new Event("themechange"));
    window.setTimeout(() => root.classList.remove("theme-transition"), 350);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-surface-2 text-fog transition-colors hover:text-ivory"
    >
      {/* Show the icon of the mode you'll switch TO. */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
        aria-hidden="true"
      >
        {dark ? (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8" />
        )}
      </svg>
    </button>
  );
}
