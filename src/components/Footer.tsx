import { getLocale, getTranslations } from "next-intl/server";
import { APP, LEGAL_NAV, NAV, PUBLISHER, SITE_URL } from "@/lib/site";
import { Link } from "@/i18n/navigation";

export async function Footer() {
  const year = new Date().getFullYear();
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tf = await getTranslations("footer");
  const tl = await getTranslations("legalNav");
  const tc = await getTranslations("common");
  const home = `/${locale}`;
  const linkClass = "inline-block py-1.5 hover:text-ivory";

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
              {tf("publishedBy", { publisher: PUBLISHER.displayName })}
            </p>
          </div>

          <div className="flex flex-col gap-8 sm:flex-row sm:gap-12">
            <nav aria-label={tf("explore")}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {tf("explore")}
              </p>
              <ul className="flex flex-col gap-y-1 text-sm text-fog">
                {NAV.map((item) => (
                  <li key={item.key}>
                    {item.type === "page" ? (
                      <Link href={item.href} className={linkClass}>
                        {t(item.key)}
                      </Link>
                    ) : (
                      <a href={`${home}#${item.id}`} className={linkClass}>
                        {t(item.key)}
                      </a>
                    )}
                  </li>
                ))}
                <li>
                  <a
                    href={APP.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {tf("appStore")}
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label={tf("companyLegal")}>
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted">
                {tf("companyLegal")}
              </p>
              <ul className="flex flex-col gap-y-1 text-sm text-fog">
                {LEGAL_NAV.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={linkClass}>
                      {tl(item.key)}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Prominent, honest disclaimer, a core E-E-A-T trust signal. */}
        <p className="mt-10 border-t border-surface-2/70 pt-6 text-xs leading-relaxed text-muted">
          {tc("disclaimer")}
        </p>
        <p className="mt-4 text-xs text-muted">
          {tf("rights", {
            year,
            legalName: PUBLISHER.legalName,
            host: new URL(SITE_URL).host,
          })}
        </p>
      </div>
    </footer>
  );
}
