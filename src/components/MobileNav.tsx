"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { NAV } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { LocaleSwitcher } from "./LocaleSwitcher";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Accessible mobile navigation. The desktop <nav> is hidden below `lg`; this
 * discloses the same links in a focus-trapped panel with a hamburger trigger,
 * so keyboard and screen-reader users on small screens can reach every section.
 */
export function MobileNav({ locale }: { locale: string }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const t = useTranslations("nav");
  const th = useTranslations("header");
  const home = `/${locale}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      );
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>(FOCUSABLE)?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkClass =
    "block rounded-lg px-3 py-3 text-base text-fog hover:bg-surface-2/40 hover:text-ivory";

  return (
    <div className="lg:hidden">
      <button
        ref={btnRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? th("closeMenu") : th("openMenu")}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-surface-2 text-fog transition-colors hover:text-ivory"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[57px] z-40 bg-black/40"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <div
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label={th("primaryNav")}
            ref={panelRef}
            className="fixed inset-x-0 top-[57px] z-50 border-t border-surface-2 bg-charcoal p-4 shadow-xl"
          >
            <ul className="flex flex-col gap-1">
              {NAV.map((item) => (
                <li key={item.key}>
                  {item.type === "page" ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={linkClass}
                    >
                      {t(item.key)}
                    </Link>
                  ) : (
                    <a
                      href={`${home}#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={linkClass}
                    >
                      {t(item.key)}
                    </a>
                  )}
                </li>
              ))}
            </ul>

            {/* Language selector, surfaced inside the menu on mobile. */}
            <div className="mt-3 border-t border-surface-2 pt-3">
              <p className="px-3 pb-2 text-xs font-medium uppercase tracking-wide text-muted">
                {th("language")}
              </p>
              <LocaleSwitcher />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
