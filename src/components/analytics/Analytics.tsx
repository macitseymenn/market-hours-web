"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  analytics,
  hasCookieAnalytics,
  hasCookielessAnalytics,
  CONSENT_KEY,
  type ConsentValue,
} from "@/lib/analytics";

/**
 * Loads analytics scripts based on env config + consent, and renders the consent
 * banner when a cookie-setting provider is configured. Cookieless analytics
 * (Plausible) load without a banner. With no env vars set, this renders nothing.
 */
export function Analytics() {
  const t = useTranslations("consent");
  // null = undecided; only meaningful when cookie analytics is configured.
  const [consent, setConsent] = useState<ConsentValue | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Read the persisted consent choice once, after mount, to avoid a hydration
    // mismatch (server can't know it). Runs a single time, not per render.
    /* eslint-disable react-hooks/set-state-in-effect */
    setMounted(true);
    try {
      const saved = localStorage.getItem(CONSENT_KEY);
      if (saved === "granted" || saved === "denied") setConsent(saved);
    } catch {
      /* private mode / storage unavailable — treat as undecided */
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, []);

  const choose = (value: ConsentValue) => {
    setConsent(value);
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch {
      /* ignore */
    }
  };

  const cookieAllowed = consent === "granted";
  const showBanner = mounted && hasCookieAnalytics && consent === null;

  return (
    <>
      {/* Cookieless — no consent required. */}
      {hasCookielessAnalytics && analytics.plausible && (
        <Script
          defer
          data-domain={analytics.plausible}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      )}

      {/* Clicky — loaded unconditionally (no banner gate). */}
      {analytics.clicky && (
        <Script
          async
          data-id={analytics.clicky}
          src="//static.getclicky.com/js"
          strategy="afterInteractive"
        />
      )}

      {/* Cookie-based — only after explicit consent. */}
      {cookieAllowed && analytics.ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${analytics.ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analytics.ga}',{anonymize_ip:true});`}
          </Script>
        </>
      )}
      {cookieAllowed && analytics.gtm && (
        <Script id="gtm-init" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${analytics.gtm}');`}
        </Script>
      )}

      {showBanner && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label={t("title")}
          className="fixed inset-x-0 bottom-0 z-50 border-t border-surface-2 bg-charcoal/95 backdrop-blur"
        >
          <div className="mx-auto flex max-w-4xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-fog">
              {t("message")}{" "}
              <Link href="/privacy" className="text-emerald underline-offset-4 hover:underline">
                {t("learnMore")}
              </Link>
            </p>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => choose("denied")}
                className="rounded-lg border border-surface-2 px-4 py-2 text-sm font-medium text-fog transition-colors hover:text-ivory"
              >
                {t("decline")}
              </button>
              <button
                type="button"
                onClick={() => choose("granted")}
                className="rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600"
              >
                {t("accept")}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
