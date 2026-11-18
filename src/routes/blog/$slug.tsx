import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { allBlogs } from 'content-collections'
import { ArrowLeft } from 'lucide-react'
import { formatDate } from '../../lib/chronology'
import { pageMeta } from '../../lib/site'

export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => {
    const post = allBlogs.find((entry) => entry.slug === params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData }) =>
    loaderData ? pageMeta(loaderData.title, loaderData.summary) : {},
  component: BlogPost,
})

function BlogPost() {
  const post = Route.useLoaderData()
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-16">
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 eyebrow hover:text-primary mb-12"
      >
        <ArrowLeft aria-hidden="true" size={14} /> Journal
      </Link>
      <article className="reveal">
        <header className="mb-12 border-b border-border/60 pb-10">
          <p className="eyebrow mb-6">
            <time dateTime={post.date}>{formatDate(post.date)}</time> ·{' '}
            {post.author}
          </p>
          <h1 className="font-display text-5xl sm:text-7xl leading-[0.95] mb-6">
            {post.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-6">{post.summary}</p>
          <ul className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li
                key={tag}
                className="font-mono text-[0.65rem] uppercase tracking-[0.14em] border border-border rounded-full px-3 py-1 text-foreground/70"
              >
                {tag}
              </li>
            ))}
          </ul>
        </header>
        <div
          className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-normal prose-a:text-primary"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
    </div>
  )
}
