import { OVERLAP, SESSIONS } from "@/lib/site";

export function SessionTimes() {
  return (
    <section
      id="sessions"
      className="border-t border-surface-2/60 bg-surface/30 py-20 md:py-24"
    >
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            Forex trading sessions explained
          </h2>
          <p className="mt-4 text-lg text-fog">
            The forex market runs 24 hours a day across the major sessions below.
            These are the standard windows in GMT; the tool above adjusts them to
            your timezone and for daylight saving automatically.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-surface-2">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Major forex trading sessions and their approximate opening hours in
              GMT.
            </caption>
            <thead>
              <tr className="bg-surface text-xs uppercase tracking-wide text-muted">
                <th scope="col" className="px-5 py-3 font-medium">
                  Session
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Region
                </th>
                <th scope="col" className="px-5 py-3 font-medium">
                  Hours (GMT)
                </th>
                <th scope="col" className="hidden px-5 py-3 font-medium sm:table-cell">
                  Why it matters
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-2">
              {SESSIONS.map((s) => {
                const isHighlight = "highlight" in s && s.highlight;
                return (
                <tr
                  key={s.city}
                  className={isHighlight ? "bg-emerald/5" : undefined}
                >
                  <th
                    scope="row"
                    className="px-5 py-4 font-display font-semibold text-ivory"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        aria-hidden="true"
                        className="h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.city}
                      {isHighlight && (
                        <span className="rounded-full bg-emerald/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-emerald">
                          Largest
                        </span>
                      )}
                    </span>
                  </th>
                  <td className="px-5 py-4 text-sm text-muted">{s.region}</td>
                  <td className="px-5 py-4 font-mono text-sm text-fog">
                    {s.gmt}
                  </td>
                  <td className="hidden px-5 py-4 text-sm text-fog sm:table-cell">
                    {s.note}
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* The overlap — the highest-liquidity window traders care about. */}
        <div className="mt-6 rounded-2xl border border-emerald/30 bg-emerald/5 p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-display text-lg font-semibold text-ivory">
              {OVERLAP.title}
            </h3>
            <span className="font-mono text-sm text-emerald">{OVERLAP.gmt}</span>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-fog">
            {OVERLAP.body}
          </p>
        </div>

        <p className="mt-6 text-xs text-muted">
          Session windows are provided for general information and shift with
          daylight-saving time (for example, London observes GMT in winter and
          BST in summer). The app always reflects the current, correctly-adjusted
          times.
        </p>
      </div>
    </section>
  );
}
