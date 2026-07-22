import { SessionClock } from "./SessionClock";

/*
  PLACEHOLDER SCREENS.
  These are stylized stand-ins so the layout is complete. Replace each
  <PhoneFrame> child with a real <Image> of an App Store screenshot once the
  company provides brand assets (drop them in /public and swap the inner div).
*/
function PhoneFrame({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mx-auto w-full max-w-[240px]">
      <div className="rounded-[2rem] border border-surface-2 bg-charcoal p-2 shadow-xl shadow-black/30">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[1.6rem] bg-surface">
          <div className="absolute left-1/2 top-2 h-1.5 w-16 -translate-x-1/2 rounded-full bg-surface-2" />
          <div className="flex h-full flex-col items-center justify-center gap-4 p-5">
            {children}
          </div>
        </div>
      </div>
      <figcaption className="mt-3 text-center text-sm text-muted">
        {label}
      </figcaption>
    </figure>
  );
}

export function Screenshots() {
  return (
    <section className="border-t border-surface-2/60 bg-surface/30 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
            The forex session clock on your phone
          </h2>
          <p className="mt-4 text-lg text-fog">
            Clean, focused screens built for quick glances during the trading
            day — on iPhone, iPad, Mac and Android.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-3">
          <PhoneFrame label="Live session clock">
            <SessionClock className="w-full max-w-[150px]" />
            <p className="text-center text-xs text-muted">
              London open in 42m
            </p>
          </PhoneFrame>

          <PhoneFrame label="Economic calendar">
            <ul className="w-full space-y-2 text-left">
              {[
                ["13:30", "USD NFP", "High"],
                ["10:00", "EUR CPI", "High"],
                ["12:00", "GBP GDP", "Med"],
              ].map(([time, ev, impact]) => (
                <li
                  key={ev}
                  className="flex items-center justify-between rounded-lg bg-charcoal/60 px-3 py-2"
                >
                  <span className="font-mono text-[11px] text-fog">{time}</span>
                  <span className="text-[11px] text-ivory">{ev}</span>
                  <span className="text-[10px] text-amber">{impact}</span>
                </li>
              ))}
            </ul>
          </PhoneFrame>

          <PhoneFrame label="Session alerts">
            <div className="w-full rounded-xl border border-surface-2 bg-charcoal/60 p-4">
              <p className="text-xs font-semibold text-ivory">
                London session opening
              </p>
              <p className="mt-1 text-[11px] text-muted">
                Opens in 15 minutes · 08:00 GMT
              </p>
            </div>
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald/15 text-emerald"
            >
              🔔
            </span>
          </PhoneFrame>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          Illustrative previews. Times and events shown are examples.
        </p>
      </div>
    </section>
  );
}
