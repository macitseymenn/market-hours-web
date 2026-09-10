import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { DEFAULT_LOCALE, type LocaleCode } from "@/i18n/locales";

/*
  Real App Store screenshots, each shown full-bleed inside a phone frame.
  Images are localized AND given keyword-rich, SEO-friendly filenames per locale
  (see SHOTS below) so the file paths themselves reinforce the page keywords,   the app UI in each shot matches the visitor's language. Drop replacement images
  in /public/screenshots/<locale>/ under the same names to update. The frame's
  aspect ratio (9/19) matches a modern phone; `object-cover` fills it with a
  negligible top/bottom crop for the ~9/18.4 source images.
*/

type Shot = { clock: string; calendar: string; alerts: string };

// Keyword-rich, localized screenshot filenames (no extension). English uses the
// primary English keywords; Spanish uses the equivalent Spanish search terms.
//
// A locale is optional here: until a language has its own localized shots in
// /public/screenshots/<locale>/, it falls back to the English set rather than
// pointing at files that do not exist. Add an entry (plus the images) to switch
// that language over.
const SHOTS: Record<typeof DEFAULT_LOCALE, Shot> & Partial<Record<LocaleCode, Shot>> = {
  en: {
    clock: "forex-market-hours-live-session-clock",
    calendar: "forex-economic-calendar",
    alerts: "forex-session-open-close-alerts",
  },
  es: {
    clock: "horario-mercado-forex-reloj-sesiones",
    calendar: "calendario-economico-forex",
    alerts: "alertas-apertura-cierre-sesiones-forex",
  },
} as const;
function PhoneFrame({
  src,
  alt,
  label,
}: {
  src: string;
  alt: string;
  label: string;
}) {
  return (
    <figure className="mx-auto w-full max-w-[240px]">
      <div className="rounded-[2rem] border border-surface-2 bg-charcoal p-2 shadow-xl shadow-black/30">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-charcoal">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 640px) 60vw, 240px"
            className="object-cover"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

export async function Screenshots() {
  const t = await getTranslations("home.screenshots");
  // Localized screenshot set where one exists, English otherwise.
  const locale = (await getLocale()) as LocaleCode;
  const localized = SHOTS[locale];
  const dir = localized ? locale : DEFAULT_LOCALE;
  const shot = localized ?? SHOTS[DEFAULT_LOCALE];

  return (
    <section className="border-t border-surface-2/60 bg-surface/30 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg text-fog">{t("intro")}</p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <PhoneFrame src={`/screenshots/${dir}/${shot.clock}.jpeg`} alt={t("clockAlt")} label={t("clockLabel")} />
          <PhoneFrame src={`/screenshots/${dir}/${shot.calendar}.jpeg`} alt={t("calendarAlt")} label={t("calendarLabel")} />
          <PhoneFrame src={`/screenshots/${dir}/${shot.alerts}.jpeg`} alt={t("alertsAlt")} label={t("alertsLabel")} />
        </div>

        <p className="mt-8 text-center text-xs text-muted">{t("disclaimer")}</p>
      </div>
    </section>
  );
}
