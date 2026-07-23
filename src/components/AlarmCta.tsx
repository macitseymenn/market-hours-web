"use client";

import { useTranslations } from "next-intl";
import { OPEN_ALARMS_EVENT } from "./ForexTimeline";

/**
 * Prominent hero call-to-action that invites visitors to set a session alarm.
 * The alarm modal lives inside <ForexTimeline> (it owns the open/close state),
 * so this button just fires a window event that the timeline listens for — no
 * shared context needed, and the two components stay decoupled.
 */
export function AlarmCta() {
  const t = useTranslations("home.hero");

  return (
    <div className="mt-8 flex justify-center">
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_ALARMS_EVENT))}
        className="group inline-flex items-center gap-2.5 rounded-full bg-emerald px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald/25 transition-all hover:bg-emerald-600 hover:shadow-emerald/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal sm:text-base"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 transition-transform group-hover:-rotate-12"
          aria-hidden="true"
        >
          <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.7 21a2 2 0 0 1-3.4 0" />
        </svg>
        {t("alarmCta")}
      </button>
    </div>
  );
}
