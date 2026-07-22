import { APP } from "@/lib/site";

/**
 * "Download on the App Store" button. Drawn with our own markup (Apple glyph +
 * text) rather than embedding Apple's badge image, so it inherits the site's
 * palette and stays crisp at any size.
 */
export function AppStoreBadge({ className = "" }: { className?: string }) {
  return (
    <a
      href={APP.appStoreUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Download on the App Store — ${APP.name} (opens in a new tab)`}
      className={`inline-flex items-center gap-3 rounded-xl bg-ivory px-5 py-3 text-charcoal transition-transform hover:-translate-y-0.5 ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-7 w-7 shrink-0"
        fill="currentColor"
      >
        <path d="M16.365 1.43c0 1.14-.417 2.2-1.11 2.99-.834.94-2.2 1.67-3.29 1.58-.13-1.1.43-2.27 1.09-3.02.75-.85 2.11-1.5 3.31-1.55zM20.5 17.4c-.59 1.36-.87 1.96-1.63 3.16-1.06 1.68-2.56 3.77-4.42 3.79-1.65.02-2.07-1.08-4.31-1.07-2.24.01-2.7 1.09-4.36 1.07-1.86-.02-3.28-1.91-4.34-3.58C-.9 16.85-1.2 11.29 1.06 8.33c1.16-1.53 2.99-2.5 4.71-2.5 1.75 0 2.85 1.08 4.3 1.08 1.4 0 2.26-1.08 4.29-1.08 1.53 0 3.15.83 4.31 2.27-3.79 2.08-3.17 7.49 1.83 9.3z" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] font-medium opacity-70">
          Download on the
        </span>
        <span className="font-display text-lg font-semibold">App Store</span>
      </span>
    </a>
  );
}
