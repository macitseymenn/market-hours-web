/**
 * Author profiles. These power the byline, the /author/[slug] page, and the
 * Person structured data — all strong E-E-A-T (authoritativeness / trust)
 * signals for Google.
 *
 * ⚠️ PLACEHOLDER DATA — replace before launch. Fabricated authors hurt trust:
 *   • name / role / bio  → a real team member's real details
 *   • avatar             → a real headshot at /public/authors/<slug>.jpg
 *   • links              → that person's real X / LinkedIn / site (used as sameAs)
 */

export type AuthorLink = {
  label: string;
  href: string;
  /** e.g. "me" for the person's own profiles (identity signal). */
  rel?: string;
};

export type Author = {
  slug: string;
  name: string;
  role: string;
  /** Short bio for bylines / cards. */
  bio: string;
  /** Longer bio (plain text/markdown) for the author page. */
  longBio: string;
  avatar: string;
  credentials: string[];
  links: AuthorLink[];
};

export const AUTHORS: Author[] = [
  {
    slug: "author",
    name: "[Author Name]",
    role: "Markets Editor",
    bio: "[One-line bio — replace with a real team member's background.]",
    longBio:
      "[Replace this with a real author biography. Describe the person's " +
      "experience with foreign-exchange markets, their qualifications, and why " +
      "readers can trust their analysis. A specific, verifiable bio is one of " +
      "the strongest trust (E-E-A-T) signals a site can have.]",
    avatar: "/authors/placeholder.svg",
    credentials: [
      "[Credential or years of market experience]",
      "[Relevant qualification or prior role]",
    ],
    links: [
      { label: "X (Twitter)", href: "https://x.com/username", rel: "me" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/username", rel: "me" },
      { label: "Personal site", href: "https://example.com", rel: "me" },
    ],
  },
];

export function getAuthor(slug: string): Author | undefined {
  return AUTHORS.find((a) => a.slug === slug);
}
