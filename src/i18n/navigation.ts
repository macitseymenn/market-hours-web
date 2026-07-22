import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

/**
 * Locale-aware navigation wrappers. Use these `Link`, `redirect`, `getPathname`
 * etc. instead of the ones from `next/navigation` so localized pathnames and
 * the active locale are handled automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
