"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

/**
 * Tiny client-side ticking countdown to the next session open, e.g.
 * "Next session opens in 2h 14m (Tokyo)." Seeded from a server-computed
 * instant (`initialNow`) so the first paint matches the server-rendered HTML
 * exactly (no hydration mismatch); a 30s interval then keeps it fresh without
 * per-second re-renders. `targetMs`/`cityName` come from `MarketStatus`, which
 * already did the `nextOpen()` computation across all five markets server-side.
 */
export function NextSessionCountdown({
  targetMs,
  initialNow,
  cityName,
}: {
  targetMs: number;
  initialNow: number;
  cityName: string;
}) {
  const t = useTranslations("home.status");
  const [now, setNow] = useState(initialNow);

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, targetMs - now);
  const hours = Math.floor(remainingMs / 3_600_000);
  const minutes = Math.floor((remainingMs % 3_600_000) / 60_000);

  return (
    <p className="mt-2 text-sm text-fog" suppressHydrationWarning>
      {t("countdown", { hours, minutes, city: cityName })}
    </p>
  );
}
