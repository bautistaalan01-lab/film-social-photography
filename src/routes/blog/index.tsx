import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { ArrowUpRight } from 'lucide-react'
import { formatDate, newestPosts } from '../../lib/chronology'
import { pageMeta } from '../../lib/site'

export const Route = createFileRoute('/blog/')({
  component: BlogIndex,
  head: () =>
    pageMeta(
      'Journal',
      'Notes on filmmaking, social content and photography from set.',
    ),
})

function BlogIndex() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16">
      <header className="reveal mb-14 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-4">Journal</p>
          <h1 className="font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight">
            Notes from set
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl">
          Process, lessons and the occasional gear rabbit hole — written
          between shoots.
        </p>
      </header>
      {allBlogs.length ? (
        <ul className="divide-y divide-border/60 border-y border-border/60">
          {newestPosts(allBlogs).map((post) => (
            <li key={post.slug}>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group grid gap-3 md:grid-cols-[12rem_1fr_auto] md:items-start py-10"
              >
                <time dateTime={post.date} className="eyebrow pt-2">
                  {formatDate(post.date)}
                </time>
                <span>
                  <span className="block font-display text-4xl sm:text-5xl leading-none group-hover:text-primary transition-colors mb-3">
                    {post.title}
                  </span>
                  <span className="block text-muted-foreground max-w-2xl mb-4">
                    {post.summary}
                  </span>
                  <span className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[0.65rem] uppercase tracking-[0.14em] border border-border rounded-full px-3 py-1 text-foreground/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="hidden md:block mt-2 transition group-hover:text-primary group-hover:rotate-45"
                />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-muted-foreground">No entries published yet.</p>
      )}
    </div>
  )
}
