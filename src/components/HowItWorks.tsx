import { getTranslations } from "next-intl/server";

export async function HowItWorks() {
  const t = await getTranslations("home.how");
  const steps = t.raw("steps") as { title: string; body: string }[];

  return (
    <section id="how-it-works" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            {t("h2")}
          </h2>
          <p className="mt-4 text-lg text-fog">{t("intro")}</p>
        </div>

        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              className="rounded-2xl border border-surface-2 bg-surface/50 p-6"
            >
              <span className="font-mono text-sm text-emerald">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold text-ivory">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-fog">
                {step.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
