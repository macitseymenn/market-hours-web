import { getTranslations } from "next-intl/server";

export async function TrustBar() {
  const t = await getTranslations("home.trust");
  const items = t.raw("items") as string[];

  return (
    <section aria-label={t("aria")} className="border-y border-surface-2/60 bg-surface/40">
      <ul className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 text-sm text-muted">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-emerald)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
              aria-hidden="true"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
