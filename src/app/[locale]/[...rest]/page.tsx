import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Catch-all for unmatched URLs under a locale prefix (e.g. `/fr/anything`).
 *
 * Without this, an unmatched path escapes the `[locale]` segment entirely and
 * falls through to the app-wide fallback, which renders outside the locale
 * layout: no header, no footer, no translations. Matching it here instead means
 * `notFound()` is thrown INSIDE the locale segment, so the localized
 * `[locale]/not-found.tsx` renders with the full site chrome.
 *
 * More specific routes always win over a catch-all, so this never shadows a
 * real page.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = (hasLocale(routing.locales, locale) ? locale : routing.defaultLocale) as Locale;
  const t = await getTranslations({ locale: l, namespace: "notFound" });

  // Next already sends `noindex` with the 404 status; this only gives the tab
  // and any shared link an honest title instead of the homepage's.
  return { title: { absolute: t("metaTitle") } };
}

export default async function CatchAllNotFound({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (hasLocale(routing.locales, locale)) setRequestLocale(locale);
  notFound();
}
