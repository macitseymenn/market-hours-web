import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/content/blog";
import { getAuthor } from "@/content/authors";
import { formatDate } from "@/lib/format";

export function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="border-t border-surface-2/60 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold text-ivory sm:text-4xl">
              Forex market hours guides
            </h2>
            <p className="mt-4 text-lg text-fog">
              Guides and explainers on forex market hours, sessions and the
              timezones that shape them.
            </p>
          </div>
          <Link
            href="/blog"
            className="rounded-lg border border-surface-2 px-4 py-2 text-sm font-medium text-fog transition-colors hover:border-emerald hover:text-emerald"
          >
            View all posts →
          </Link>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => {
            const author = getAuthor(post.authorSlug);
            return (
              <article
                key={post.slug}
                className="group flex flex-col overflow-hidden rounded-2xl border border-surface-2 bg-surface/50"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="relative block aspect-[16/9] overflow-hidden bg-surface-2"
                  aria-label={post.title}
                >
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 380px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2 text-xs text-muted">
                    {post.tags[0] && <span className="text-emerald">{post.tags[0]}</span>}
                    <span aria-hidden="true">·</span>
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                  </div>

                  <h3 className="mt-2 text-lg font-semibold text-ivory">
                    <Link href={`/blog/${post.slug}`} className="hover:text-emerald">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-fog">{post.description}</p>

                  <div className="mt-5 flex items-center justify-between border-t border-surface-2 pt-4">
                    {author && (
                      <div className="flex items-center gap-2">
                        <Image
                          src={author.avatar}
                          alt={author.name}
                          width={28}
                          height={28}
                          className="rounded-full border border-surface-2"
                        />
                        <Link
                          href={`/author/${author.slug}`}
                          className="text-sm text-fog hover:text-emerald"
                        >
                          {author.name}
                        </Link>
                      </div>
                    )}
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm font-medium text-emerald hover:text-emerald-600"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
