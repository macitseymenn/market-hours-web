#!/usr/bin/env node
/**
 * Locale coverage report: for every language in the registry, what is translated
 * and what is still missing. Run it before giving a locale an `availableFrom`
 * date, and again before the date arrives.
 *
 *   node scripts/check-locales.mjs          report, exits 1 if a LIVE locale is incomplete
 *   node scripts/check-locales.mjs --strict  also exits 1 for scheduled locales
 *
 * What the compiler already guarantees (so this script does not re-check it):
 * anything typed `Record<LocaleCode, T>` — the home metadata, each legal page's
 * COPY object — cannot compile until the new locale is filled in. What it cannot
 * see is JSON message parity and per-post blog coverage, which is what this
 * reports.
 */
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const DEFAULT_LOCALE = "en";
/** A locale needs at least this many translated posts to be worth launching. */
const MIN_POSTS = 5;

const strict = process.argv.includes("--strict");

// ── registry ──────────────────────────────────────────────────────────────────
const registrySrc = readFileSync(join(ROOT, "src/i18n/locales.ts"), "utf8");
const registryBody = registrySrc.slice(registrySrc.indexOf("export const LOCALES"));
const locales = [...registryBody.matchAll(/\bcode:\s*"([a-z-]+)"([\s\S]{0,400}?)\n  \}/g)].map(
  ([, code, rest]) => ({
    code,
    availableFrom: rest.match(/availableFrom:\s*"([\d-]{10})"/)?.[1] ?? null,
  }),
);

if (!locales.some((l) => l.code === DEFAULT_LOCALE)) {
  console.error(`Could not parse the locale registry (no "${DEFAULT_LOCALE}" entry found).`);
  process.exit(2);
}

// ── message catalogues ────────────────────────────────────────────────────────
const flatten = (obj, prefix = "") =>
  Object.entries(obj).flatMap(([k, v]) => {
    const path = prefix ? `${prefix}.${k}` : k;
    return v && typeof v === "object" && !Array.isArray(v) ? flatten(v, path) : [path];
  });

const catalogue = (code) => {
  const file = join(ROOT, "messages", `${code}.json`);
  try {
    return new Set(flatten(JSON.parse(readFileSync(file, "utf8"))));
  } catch {
    return null;
  }
};

const baseKeys = catalogue(DEFAULT_LOCALE);

// ── blog coverage ─────────────────────────────────────────────────────────────
// Each post declares `slug: { <locale>: "…", … }`; a locale present there is
// counted as translated (the runtime gate in @/content/blog is the real check,
// this is just the report).
const blogSrc = readFileSync(join(ROOT, "src/content/blog.ts"), "utf8");
const slugBlocks = [...blogSrc.matchAll(/^    slug: \{\n([\s\S]*?)^    \},$/gm)].map(
  ([, body]) => new Set([...body.matchAll(/^\s*([a-z-]+):\s*"/gm)].map(([, c]) => c)),
);
const totalPosts = slugBlocks.length;

// ── screenshots ───────────────────────────────────────────────────────────────
let shotDirs = [];
try {
  shotDirs = readdirSync(join(ROOT, "public/screenshots"), { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);
} catch {
  /* no screenshots directory */
}

// ── report ────────────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
let failed = false;

console.log(`Locale coverage (${totalPosts} published-or-scheduled posts, today ${today})\n`);

for (const { code, availableFrom } of locales) {
  const live = !availableFrom || availableFrom <= today;
  const state = live ? "LIVE" : `scheduled ${availableFrom}`;

  const keys = catalogue(code);
  const missingKeys = keys ? [...baseKeys].filter((k) => !keys.has(k)) : null;
  const extraKeys = keys ? [...keys].filter((k) => !baseKeys.has(k)) : null;
  const posts = slugBlocks.filter((s) => s.has(code)).length;

  const problems = [];
  if (!keys) problems.push(`messages/${code}.json is missing`);
  else if (missingKeys.length) problems.push(`${missingKeys.length} untranslated message keys`);
  if (extraKeys?.length) problems.push(`${extraKeys.length} keys not in ${DEFAULT_LOCALE}.json`);
  if (posts < MIN_POSTS) problems.push(`only ${posts} translated posts (want ${MIN_POSTS}+)`);

  const ok = problems.length === 0;
  console.log(`${ok ? "ok  " : "MISS"}  ${code.padEnd(6)} ${state.padEnd(20)} messages ${
    keys ? `${baseKeys.size - missingKeys.length}/${baseKeys.size}` : "-"
  }  posts ${posts}/${totalPosts}  screenshots ${
    shotDirs.includes(code) ? "own" : `falls back to ${DEFAULT_LOCALE}`
  }`);

  for (const p of problems) console.log(`        · ${p}`);
  if (missingKeys?.length) {
    for (const k of missingKeys.slice(0, 12)) console.log(`          missing key: ${k}`);
    if (missingKeys.length > 12) console.log(`          … and ${missingKeys.length - 12} more`);
  }

  if (!ok && (live || strict)) failed = true;
}

console.log(
  failed
    ? "\nIncomplete locale(s) above. A locale must be complete before its availableFrom date."
    : "\nAll checked locales complete.",
);
process.exit(failed ? 1 : 0);
