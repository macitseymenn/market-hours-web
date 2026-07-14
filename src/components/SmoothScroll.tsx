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

    // Smoothly scroll to hash targets, offset for the sticky header. Handles both
    // in-page "#id" links and homepage "/#id" links (only when already on "/").
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"], a[href^="/#"]',
      );
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      let hash: string | null = null;
      if (href.startsWith("#")) {
        hash = href;
      } else if (href.startsWith("/#")) {
        // Let the browser navigate home if we're on another page.
        if (window.location.pathname !== "/") return;
        hash = href.slice(1);
      }
      if (!hash || hash === "#") return;
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
