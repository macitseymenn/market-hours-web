"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AlarmSettings } from "./AlarmSettings";

/** Popup dialog holding the alarm settings, opened by the timeline's Options button. */
export function AlarmModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
      <button
        type="button"
        aria-label="Close options"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
      />
      <div className="relative z-10 flex max-h-[85vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-surface-2 bg-charcoal shadow-2xl">
        {/* Fixed header */}
        <div className="flex items-center justify-between border-b border-surface-2 px-5 py-4">
          <h2 id="alarm-options-title" className="text-lg font-semibold text-ivory">
            Alarm options
          </h2>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-surface-2 text-muted transition-colors hover:text-ivory"
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
