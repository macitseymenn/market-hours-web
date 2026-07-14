import { FAQ } from "@/lib/site";

// Native <details>/<summary> accordion — fully keyboard-accessible and works
// with no client-side JavaScript.
export function Faq() {
  return (
    <section id="faq" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-5">
        <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
          Frequently asked questions
        </h2>

        <div className="mt-10 divide-y divide-surface-2 border-y border-surface-2">
          {FAQ.map((item) => (
            <details key={item.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg font-medium text-ivory">
                {item.q}
                <span
                  aria-hidden="true"
                  className="shrink-0 text-emerald transition-transform group-open:rotate-45"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
              </summary>
              <p className="mt-3 text-fog">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
