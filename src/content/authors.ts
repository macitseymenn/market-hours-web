/**
 * Author profiles. These power the byline, the /author/[slug] page, and the
 * Person structured data — all strong E-E-A-T (Experience / Expertise /
 * Authoritativeness / Trust) signals for Google and answer engines.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * HOW TO WIRE IN THE REAL AUTHOR (orchestrator)
 * ─────────────────────────────────────────────────────────────────────────────
 * Replace ONLY the bracketed placeholder fields on the entry below with the real,
 * verifiable person the site owner provides. Nothing else needs to change — the
 * moment the placeholders are gone, `isPlaceholderAuthor()` returns false and the
 * whole site lights up automatically:
 *
 *   • the /author/[slug] page starts being indexed (robots index flips on),
 *   • the Person JSON-LD emits `sameAs`, `image`, credentials, `knowsAbout`,
 *     and `worksFor` the Organization,
 *   • blog bylines switch from the honest Organization attribution to the
 *     named person, and the BlogPosting `author` becomes a Person.
 *
 * Fields to fill with REAL data (never invent a person or credentials):
 *   • name       → the real person's name (must NOT start with "[")
 *   • role       → their real job title (e.g. "Markets Editor")
 *   • bio        → one honest sentence (must NOT start with "[")
 *   • longBio    → a real biography (must NOT contain "[Replace" / start with "[")
 *   • avatar     → a real headshot at /public/authors/<slug>.jpg (or .webp)
 *   • credentials→ real, verifiable credentials / experience (drop the brackets)
 *   • links      → the person's real X / LinkedIn / site (emitted as `sameAs`)
 *   • knowsAbout → topics they demonstrably know (a sensible default is provided)
 *
 * ⚠️ DO NOT fabricate any of the above. Placeholder → honest Organization-level
 * attribution is the correct, trustworthy state until real data arrives.
 */

export type AuthorLink = {
  label: string;
  href: string;
  /** e.g. "me" for the person's own profiles (identity signal for rel="me"). */
  rel?: string;
};

export type Author = {
  slug: string;
  /**
   * "team" = honest organization-level attribution (the current, deliberate
   * state — no named individual, so no Person structured data and no indexed
   * profile). "person" = a real, verifiable individual (name/photo/sameAs), which
   * unlocks Person JSON-LD + an indexed author page. Never fabricate a person.
   */
  kind: "person" | "team";
  name: string;
  role: string;
  /** Short bio for bylines / cards. */
  bio: string;
  /** Longer bio (plain text/markdown) for the author page. */
  longBio: string;
  avatar: string;
  credentials: string[];
  links: AuthorLink[];
  /**
   * Topics the author demonstrably knows about → emitted as Person.knowsAbout in
   * the structured data (an expertise signal). Falls back to the site's core
   * subject matter if left undefined.
   */
  knowsAbout?: string[];
};

/** Default expertise topics for a Forex Market Hours author (site subject matter). */
export const DEFAULT_KNOWS_ABOUT = [
  "Forex market hours",
  "Currency trading sessions",
] as const;

/** The organization-level byline shown while content is attributed to the team
 *  rather than a named individual. Links to the editorial-policy so readers can
 *  see how content is researched, sourced and reviewed. */
export const EDITORIAL_TEAM = {
  name: "Forex Market Hours Editorial Team",
  href: "/editorial-policy",
  avatar: "/icon.webp",
} as const;

export const AUTHORS: Author[] = [
  {
    slug: "author",
    // Deliberate, honest organization-level attribution (see EDITORIAL_TEAM).
    // To publish under a REAL named individual instead, add a second entry with
    // kind: "person" and real, verifiable data (name, photo, LinkedIn/X sameAs) —
    // that unlocks Person JSON-LD + an indexed author page automatically. Never
    // fabricate a person or credentials.
    kind: "team",
    name: EDITORIAL_TEAM.name,
    role: "Editorial Team",
    bio: "Researched and reviewed by the Forex Market Hours editorial team against primary sources.",
    longBio:
      "The Forex Market Hours editorial team builds and maintains the live " +
      "session tool and writes every guide, checking each session time against " +
      "primary sources — the IANA time-zone database, central-bank trading " +
      "calendars and the Bank for International Settlements. We publish market-" +
      "hours information only and do not provide financial advice.",
    avatar: EDITORIAL_TEAM.avatar,
    credentials: [],
    links: [],
    knowsAbout: [...DEFAULT_KNOWS_ABOUT],
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}

/**
 * True while an author entry is still placeholder scaffolding rather than a real,
 * verifiable person. This single guard drives every trust-sensitive decision:
 *
 *   • author page indexing  → noindex while placeholder, indexed once real
 *   • Person JSON-LD         → suppressed while placeholder (no fake identity)
 *   • sameAs / credentials   → not emitted / not rendered while placeholder
 *   • blog bylines           → attributed to the Organization while placeholder
 *
 * It flips to false automatically when the orchestrator fills in real data, so no
 * code change is needed — only `authors.ts` edits. Detection is intentionally
 * conservative: any bracketed placeholder field marks the whole entry as unready.
 */
export function isPlaceholderAuthor(author: Author): boolean {
  // A "team" entry is organization-level attribution, not a named individual, so
  // it is treated exactly like a not-yet-real author for every trust-sensitive
  // decision below. (The bracket checks remain as a safety net against any
  // leftover placeholder scaffolding.)
  return (
    author.kind === "team" ||
    author.name.trim().startsWith("[") ||
    author.bio.trim().startsWith("[") ||
    author.longBio.trim().startsWith("[") ||
    author.longBio.includes("[Replace")
  );
}
