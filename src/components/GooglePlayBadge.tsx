import { APP } from "@/lib/site";

/**
 * "Get it on Google Play" button. Drawn with our own markup so it matches the
 * App Store badge and the site palette. Swap APP.googlePlayUrl for the real
 * listing once the Android app is published.
 */
export function GooglePlayBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP.googlePlayUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Forex Market Hours on Google Play (opens in a new tab)"
      className={`inline-flex items-center gap-3 rounded-xl border border-surface-2 bg-charcoal px-5 py-3 text-ivory transition-transform hover:-translate-y-0.5 hover:border-fog/40 ${className}`}
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7 shrink-0">
        <path d="M3.6 2.3 13.3 12 3.6 21.7a1.6 1.6 0 0 1-.6-1.25V3.55c0-.5.24-.95.6-1.25z" fill="#00d0ff" />
        <path d="M16.9 8.4 13.3 12l3.6 3.6 3.5-2a1.45 1.45 0 0 0 0-3.2z" fill="#ffce00" />
        <path d="M3.6 2.3c.3-.24.7-.3 1.06-.1L16.9 8.4 13.3 12z" fill="#00f076" />
        <path d="M3.6 21.7c.3.24.7.3 1.06.1L16.9 15.6 13.3 12z" fill="#ff3a44" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-medium opacity-70">Get it on</span>
        <span className="text-lg font-semibold">Google Play</span>
      </span>
    </a>
  );
}
