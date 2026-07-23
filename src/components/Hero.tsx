import { getTranslations } from "next-intl/server";
import { ForexTimeline } from "./ForexTimeline";
import { AlarmCta } from "./AlarmCta";
import { MarketStatus } from "./MarketStatus";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section id="top" className="relative overflow-hidden border-b border-surface-2/60">
      {/* One restrained glow, not a full-page gradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-15%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald/10 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-ivory sm:text-5xl">
            {t("h1")}
          </h1>
          {/* Definition-first answer, the extractable paragraph AI Overviews and
              featured snippets quote for "forex market hours". */}
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fog">
            {t("definition")}
          </p>
          {/* Primary alarm CTA, high in the hero so it's visible on load on both
              mobile and desktop. Opens the timeline's alarm modal via a window
              event (see AlarmCta). */}
          <AlarmCta />
        </div>

        {/* The product: the live market-hours tool, front and centre, the hero
            leads straight from the definition into the live clock. */}
        <div className="mt-10">
          <ForexTimeline />
        </div>

        {/* Explicit "converter" framing: this live tool converts every session
            to the visitor's own timezone, named as such for query match with
            "forex market hours converter" / "forex time converter" searches.
            Placed below the tool so the hero leads straight into the live clock. */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-ivory sm:text-2xl">
            {t("converterH2")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-fog">{t("converterIntro")}</p>
        </div>

        {/* Server-rendered "open right now" status, crawlable without JS, kept
            fresh via the homepage's 5-minute ISR revalidation. Placed below the
            converter framing, just above the app prompt. */}
        <MarketStatus />

        <div className="mt-8 flex flex-col items-center gap-3">
          <p className="text-center text-sm text-muted">{t("phonePrompt")}</p>
          <a
            href="#apps"
            className="inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-5 py-2.5 text-sm font-semibold text-emerald transition-colors hover:border-emerald hover:bg-emerald/15"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <rect x="7" y="2" width="10" height="20" rx="2.5" />
              <path d="M11 18h2" />
            </svg>
            {t("phoneLink")}
          </a>
        </div>
      </div>
    </section>
  );
}
