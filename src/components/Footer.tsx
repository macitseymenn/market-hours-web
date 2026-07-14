import { APP, DISCLAIMER, NAV, PUBLISHER, SITE_URL } from "@/lib/site";
import { NavItem } from "./NavItem";

export function Footer() {
  const year = 2026; // Build-time constant; update on the yearly deploy.
  return (
    <footer className="border-t border-surface-2/70 bg-surface/40">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <p className="font-display text-lg font-semibold text-ivory">
              {APP.name}
            </p>
            <p className="mt-2 text-sm text-muted">{APP.tagline}</p>
            <p className="mt-4 text-sm text-muted">
              Published by {PUBLISHER.displayName}.
            </p>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-fog">
              {NAV.map((item) => (
                <li key={item.href}>
                  <NavItem href={item.href} className="hover:text-ivory">
                    {item.label}
                  </NavItem>
                </li>
              ))}
              <li>
                <a
                  href={APP.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ivory"
                >
                  App Store
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Prominent, honest disclaimer — a core E-E-A-T trust signal. */}
        <p className="mt-10 border-t border-surface-2/70 pt-6 text-xs leading-relaxed text-muted">
          {DISCLAIMER}
        </p>
        <p className="mt-4 text-xs text-muted">
          © {year} {PUBLISHER.legalName}. Not affiliated with Apple Inc. “App
          Store” is a trademark of Apple Inc. · {new URL(SITE_URL).host}
        </p>
      </div>
    </footer>
  );
}
