import { SESSIONS } from "@/lib/site";

/**
 * Static 24-hour session clock used inside the phone-mockup screenshot. Draws
 * every session arc from the shared SESSIONS data (so it always matches the live
 * clock and the table). No time logic — this is a decorative preview.
 */

const CENTER = 130;
const HOUR_ANGLE = 360 / 24;
const BASE_R = 112;
const RING_STEP = 14;

function round(n: number) {
  return Math.round(n * 1000) / 1000;
}

function polar(hour: number, r: number) {
  const theta = (hour * HOUR_ANGLE - 90) * (Math.PI / 180);
  return { x: round(CENTER + r * Math.cos(theta)), y: round(CENTER + r * Math.sin(theta)) };
}

function arcPath(openUTC: number, closeUTC: number, r: number) {
  const span = (closeUTC - openUTC + 24) % 24 || 24;
  const a = polar(openUTC, r);
  const b = polar(closeUTC, r);
  const largeArc = span > 12 ? 1 : 0;
  return `M ${a.x.toFixed(2)} ${a.y.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${b.x.toFixed(2)} ${b.y.toFixed(2)}`;
}

export function SessionClock({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 260 260"
      role="img"
      aria-label="24-hour clock showing the major forex sessions in GMT."
      className={className}
    >
      <circle cx={CENTER} cy={CENTER} r={120} fill="none" stroke="var(--color-surface-2)" strokeWidth="1" />
      {Array.from({ length: 24 }).map((_, h) => {
        const outer = polar(h, 120);
        const inner = polar(h, h % 6 === 0 ? 110 : 115);
        return (
          <line
            key={h}
            x1={outer.x}
            y1={outer.y}
            x2={inner.x}
            y2={inner.y}
            stroke="var(--color-surface-2)"
            strokeWidth={h % 6 === 0 ? 1.5 : 1}
          />
        );
      })}
      {SESSIONS.map((s, i) => (
        <path
          key={s.city}
          d={arcPath(s.openUTC, s.closeUTC, BASE_R - i * RING_STEP)}
          fill="none"
          stroke={s.color}
          strokeWidth="7"
          strokeLinecap="round"
          opacity={s.city === "London" ? 1 : 0.85}
        />
      ))}
      <circle cx={CENTER} cy={CENTER} r={3} fill="var(--color-ivory)" />
    </svg>
  );
}
