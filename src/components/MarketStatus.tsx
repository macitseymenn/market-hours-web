import { getLocale, getTranslations } from "next-intl/server";
import { MARKETS, isMarketOpen, nextOpen } from "@/lib/markets";
import { localeMeta } from "@/i18n/locales";
import { CONTENT_DATES } from "@/lib/site";
import { NextSessionCountdown } from "./NextSessionCountdown";

/**
 * Server-rendered "is the forex market open right now" status, computed at
 * render time from `markets.ts` (the same DST-accurate model the live tool and
 * alarms use). Session open/closed state is a GLOBAL fact, identical for
 * every visitor regardless of their own timezone, so it is safe to render on
 * the server and cache: the homepage sets `export const revalidate = 300`, so
 * this sentence is at most 5 minutes stale, which is accurate enough since
 * sessions only change on hour boundaries.
 */
export async function MarketStatus() {
  const locale = await getLocale();
  const t = await getTranslations("home.status");
  const tc = await getTranslations("home.sessions");
  const intlLocale = localeMeta(locale).intl;

  // `new Date().getTime()` rather than `Date.now()`, the React Compiler ESLint
  // rule flags `Date.now()` specifically as an "impure function call" during
  // render, even in an async server component computing a legitimately fresh
  // value once per (ISR-cached) request. Behaviourally identical.
  const now = new Date().getTime();
  const openMarkets = MARKETS.filter((m) => isMarketOpen(m, now));
  const names = openMarkets.map((m) => tc(`cities.${m.city}`));
  const list = new Intl.ListFormat(intlLocale, {
    style: "long",
    type: "conjunction",
  }).format(names);

  // The next market to open across all five sessions, server-seeded so the
  // client countdown can tick without another round-trip.
  let nextCity = MARKETS[0];
  let nextAt = Infinity;
  for (const m of MARKETS) {
    const at = nextOpen(m, now);
    if (at < nextAt) {
      nextAt = at;
      nextCity = m;
    }
  }

  const verifiedDate = new Intl.DateTimeFormat(intlLocale, {
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${CONTENT_DATES.modified}T12:00:00Z`));

  return (
    <div className="mx-auto mt-6 max-w-2xl text-center">
      <p className="text-base font-medium text-ivory">
        {t("statusLine", { count: openMarkets.length, list })}
      </p>
      <p className="mt-1.5 text-sm text-fog">{t("fact")}</p>
      <NextSessionCountdown
        targetMs={nextAt}
        initialNow={now}
        cityName={tc(`cities.${nextCity.city}`)}
      />
      <p className="mt-3 text-xs text-muted">
        {t("verified", { date: verifiedDate })}
      </p>
    </div>
  );
}
