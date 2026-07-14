/**
 * Synthesized alarm sounds (Web Audio, no audio files). Each is a multi-note
 * pattern lasting ~1.5–2.5s so it actually reads as an alarm, not a single blip.
 */

export type SoundId = "chime" | "beeps" | "ring" | "digital";

export const SOUNDS: { id: SoundId; label: string }[] = [
  { id: "chime", label: "Chime" },
  { id: "beeps", label: "Beeps" },
  { id: "ring", label: "Ring" },
  { id: "digital", label: "Digital" },
];

type Note = { f: number; t: number; d: number; type?: OscillatorType; gain?: number };

// Note frequencies (Hz). Arpeggios/patterns are hand-tuned to sound pleasant.
const PATTERNS: Record<SoundId, Note[]> = {
  // Bell-like ascending arpeggio, played twice.
  chime: [
    { f: 1046.5, t: 0.0, d: 0.55, gain: 0.22 },
    { f: 1318.5, t: 0.18, d: 0.55, gain: 0.22 },
    { f: 1568.0, t: 0.36, d: 0.8, gain: 0.24 },
    { f: 1046.5, t: 0.95, d: 0.55, gain: 0.18 },
    { f: 1318.5, t: 1.13, d: 0.55, gain: 0.18 },
    { f: 1568.0, t: 1.31, d: 1.0, gain: 0.2 },
  ],
  // Classic repeated alarm beeps (square wave).
  beeps: [0, 0.26, 0.52, 0.78, 1.04, 1.3].map((t) => ({
    f: 880,
    t,
    d: 0.16,
    type: "square" as OscillatorType,
    gain: 0.18,
  })),
  // Old-phone style two-tone warble.
  ring: Array.from({ length: 5 }).flatMap((_, i) => {
    const base = i * 0.4;
    return [
      { f: 1000, t: base, d: 0.18, type: "triangle" as OscillatorType, gain: 0.2 },
      { f: 780, t: base + 0.2, d: 0.18, type: "triangle" as OscillatorType, gain: 0.2 },
    ];
  }),
  // Rising digital arpeggio, played twice.
  digital: [0, 1].flatMap((rep) =>
    [523.25, 659.25, 783.99, 1046.5].map((f, i) => ({
      f,
      t: rep * 0.7 + i * 0.13,
      d: 0.16,
      type: "sawtooth" as OscillatorType,
      gain: 0.14,
    })),
  ),
};

/** Schedule a sound's notes on the given AudioContext with a soft envelope. */
export function playSound(ctx: AudioContext, id: SoundId) {
  const notes = PATTERNS[id] ?? PATTERNS.chime;
  const t0 = ctx.currentTime;
  for (const n of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = n.type ?? "sine";
    osc.frequency.value = n.f;
    osc.connect(gain);
    gain.connect(ctx.destination);
    const start = t0 + n.t;
    const peak = n.gain ?? 0.2;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(peak, start + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + n.d);
    osc.start(start);
    osc.stop(start + n.d + 0.03);
  }
}
