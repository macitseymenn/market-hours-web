"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Enables Lenis momentum ("smooth") scrolling for the whole page and routes
 * in-page anchor clicks through Lenis so they glide instead of jumping. Disabled
 * entirely for visitors who prefer reduced motion.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Smoothly scroll to hash targets, offset for the sticky header. Handles
    // bare "#id" links and locale-prefixed home links like "/en#id" / "/es#id",
    // but only when the link points at the page we're already on, otherwise the
    // browser navigates normally (e.g. from a blog post back to a home section).
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.('a[href*="#"]');
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;
      const hash = href.slice(hashIndex);
      const path = href.slice(0, hashIndex);
      const here = window.location.pathname;
      const onThisPage =
        path === "" || path === here || path === here.replace(/\/$/, "");
      if (!onThisPage || hash === "#") return;
      const target = document.querySelector(hash);
      if (target) {
        e.preventDefault();
        lenis.scrollTo(target as HTMLElement, { offset: -72 });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
