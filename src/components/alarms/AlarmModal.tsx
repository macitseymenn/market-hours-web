"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import { AlarmSettings } from "./AlarmSettings";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Popup dialog holding the alarm settings, opened by the timeline's Options button. */
export function AlarmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations("alarms");
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      // Trap Tab focus inside the dialog panel.
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
    // Lock background scroll while the dialog is open.
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="alarm-options-title"
    >
      {/* Decorative click-to-close backdrop, kept out of the tab order and the
          a11y tree so the focus trap only sees elements inside the panel. */}
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-surface-2 bg-charcoal shadow-2xl"
      >
        {/* Fixed header */}
        <div className="flex items-center justify-between border-b border-surface-2 px-5 py-4">
          <h2 id="alarm-options-title" className="text-lg font-semibold text-ivory">
            {t("options")}
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label={t("close")}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-surface-2 text-muted transition-colors hover:text-ivory"
          >
            ✕
          </button>
        </div>
        {/* Scrollable body. data-lenis-prevent stops the Lenis smooth-scroll from
            hijacking the mouse wheel here, so this area scrolls natively. */}
        <div data-lenis-prevent className="overflow-y-auto overscroll-contain px-5 py-5">
          <AlarmSettings />
        </div>
      </div>
    </div>,
    document.body,
  );
}
