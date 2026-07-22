import Image from "next/image";
import { APP, CTA_HREF, NAV } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { NavItem } from "./NavItem";
import { MobileNav } from "./MobileNav";

// The "Get the app" item is rendered as the standalone CTA button, so it's
// filtered out of the inline nav to avoid a duplicate adjacent link.
const HEADER_NAV = NAV.filter((item) => item.href !== CTA_HREF);

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-surface-2/70 bg-charcoal/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <NavItem href="/" className="flex items-center gap-2.5" aria-label={`${APP.name} home`}>
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
        </NavItem>

        {/* Desktop nav appears at lg to avoid wrapping/collision at the md (768px) width. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-fog">
            {HEADER_NAV.map((item) => (
              <li key={item.href}>
                <NavItem
                  href={item.href}
                  className="inline-block py-2 transition-colors hover:text-ivory"
                >
                  {item.label}
                </NavItem>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <NavItem
            href={CTA_HREF}
            className="hidden rounded-lg bg-emerald px-4 py-2 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald-600 sm:inline-block"
          >
            Get the app
          </NavItem>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
