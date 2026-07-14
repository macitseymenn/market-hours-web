import { APP } from "@/lib/site";
import { AppStoreBadge } from "./AppStoreBadge";
import { GooglePlayBadge } from "./GooglePlayBadge";

export function CtaBand() {
  return (
    <section id="apps" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-5">
        <div className="relative overflow-hidden rounded-3xl border border-surface-2 bg-surface/60 px-6 py-14 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald/10 blur-3xl"
          />
          <p className="relative text-sm font-medium uppercase tracking-wide text-emerald">
            Take it with you
          </p>
          <h2 className="relative mt-3 text-3xl font-semibold text-ivory sm:text-4xl">
            Get the free app for iOS &amp; Android
          </h2>
          <p className="relative mx-auto mt-4 max-w-xl text-lg text-fog">
            Everything the web tool does, plus Home &amp; Lock Screen widgets, an
            economic calendar, and alerts 15 minutes before each session opens.
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-4">
            <AppStoreBadge />
            <GooglePlayBadge />
          </div>
          <p className="relative mt-5 text-sm text-muted">
            {APP.platforms.join(" · ")} · No ads · Collects no data
          </p>
        </div>
      </div>
    </section>
  );
}
