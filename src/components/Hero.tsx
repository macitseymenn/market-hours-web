import { getTranslations } from "next-intl/server";
import { ForexTimeline } from "./ForexTimeline";
import { MarketStatus } from "./MarketStatus";

export async function Hero() {
  const t = await getTranslations("home.hero");

  return (
    <section id="top" className="relative overflow-hidden border-b border-surface-2/60">
      {/* One restrained glow — not a full-page gradient. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-15%] h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-emerald/10 blur-3xl"
      />
      <div className="mx-auto max-w-6xl px-5 py-14 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] text-ivory sm:text-5xl">
            {t("h1")}
          </h1>
          {/* Definition-first answer — the extractable paragraph AI Overviews and
              featured snippets quote for "forex market hours". */}
          <p className="mx-auto mt-5 max-w-2xl text-lg text-fog">
            {t("definition")}
          </p>
        </div>

        {/* The product: the live market-hours tool, front and centre — the hero
            leads straight from the definition into the live clock. */}
        <div className="mt-10">
          <ForexTimeline />
        </div>

        {/* Explicit "converter" framing: this live tool converts every session
            to the visitor's own timezone — named as such for query match with
            "forex market hours converter" / "forex time converter" searches.
            Placed below the tool so the hero leads straight into the live clock. */}
        <div className="mx-auto mt-10 max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-ivory sm:text-2xl">
            {t("converterH2")}
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-fog">{t("converterIntro")}</p>
        </div>

        {/* Server-rendered "open right now" status — crawlable without JS, kept
            fresh via the homepage's 5-minute ISR revalidation. Placed below the
            converter framing, just above the app prompt. */}
        <MarketStatus />

        <p className="mt-6 text-center text-sm text-muted">
          {t("phonePrompt")}{" "}
          <a href="#apps" className="text-emerald underline-offset-4 hover:underline">
            {t("phoneLink")}
          </a>
        </p>
      </div>
    </section>
  );
}
