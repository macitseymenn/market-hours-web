import Link from "next/link";

/**
 * Renders a real page route (e.g. "/blog") as a Next <Link> for client-side
 * navigation, and a hash/section link (e.g. "/#sessions", "#faq") as a plain
 * <a> so the Lenis smooth-scroll handler can intercept it.
 */
export function NavItem({
  href,
  className,
  children,
  "aria-label": ariaLabel,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  "aria-label"?: string;
}) {
  const isPageRoute = href.startsWith("/") && !href.startsWith("/#");
  if (isPageRoute) {
    return (
      <Link href={href} className={className} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} aria-label={ariaLabel}>
      {children}
    </a>
  );
}
