import { getTranslations } from "next-intl/server";
import { FEATURES } from "@/lib/site";

// Minimal stroke icons keyed to each feature. aria-hidden — the heading carries
// the meaning for assistive tech.
const ICONS: Record<string, React.ReactNode> = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  widget: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="17" rx="2" />
      <path d="M3 9h18M8 2v4M16 2v4" />
    </>
  ),
  bell: (
    <>
      <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.7 21a2 2 0 0 1-3.4 0" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" />
    </>
  ),
  moon: <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8" />,
};

export async function Features() {
  const t = await getTranslations("home.features");
  const items = t.raw("items") as { title: string; body: string }[];

  return (
    <section id="features" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg text-fog">{t("intro")}</p>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <li
              key={f.icon}
              className="rounded-2xl border border-surface-2 bg-surface/50 p-6 transition-colors hover:border-emerald/50"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                  aria-hidden="true"
                >
                  {ICONS[f.icon]}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-ivory">
                {items[i]?.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                {items[i]?.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
