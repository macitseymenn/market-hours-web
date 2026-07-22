import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { CTA_ID, NAV } from "@/lib/site";
import { Link } from "@/i18n/navigation";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";
import { LocaleSwitcher } from "./LocaleSwitcher";

// The "Get the app" item is rendered as the standalone CTA button, so it's
// filtered out of the inline nav to avoid a duplicate adjacent link.
const HEADER_NAV = NAV.filter((item) => !(item.type === "hash" && item.id === CTA_ID));

export async function Header() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const th = await getTranslations("header");
  const home = `/${locale}`;

  return (
    <header className="sticky top-0 z-40 border-b border-surface-2/70 bg-charcoal/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-2.5" aria-label={th("homeAria")}>
          <Image
            src="/icon.webp"
            alt=""
            width={34}
            height={34}
            priority
            className="rounded-lg"
          />
          <span className="font-display text-[15px] font-semibold text-ivory">
            Forex Market Hours
          </span>
        </Link>

        {/* Desktop nav appears at lg to avoid wrapping/collision at the md (768px) width. */}
        <nav aria-label={th("primaryNav")} className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-fog">
            {HEADER_NAV.map((item) => (
              <li key={item.key}>
                {item.type === "page" ? (
                  <Link
                    href={item.href}
                    className="inline-block py-2 transition-colors hover:text-ivory"
                  >
                    {t(item.key)}
                  </Link>
                ) : (
                  <a
                    href={`${home}#${item.id}`}
                    className="inline-block py-2 transition-colors hover:text-ivory"
                  >
                    {t(item.key)}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <ThemeToggle />
          <a
            href={`${home}#${CTA_ID}`}
            className="hidden rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600 sm:inline-block"
          >
            {t("getApp")}
          </a>
          <MobileNav locale={locale} />
        </div>
      </div>
    </header>
  );
}
