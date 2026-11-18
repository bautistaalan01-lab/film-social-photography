import { useCallback, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import { allBlogs, type Project } from 'content-collections'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { ProjectLightbox } from '../components/ProjectLightbox'
import { WorkCard } from '../components/WorkCard'
import { cdn, disciplines, pageMeta, site } from '../lib/site'
import { featuredProjects } from '../lib/projects'
import { formatDate, newestPosts } from '../lib/chronology'

export const Route = createFileRoute('/')({
  component: PortfolioHome,
  head: () => pageMeta('Film, social & photography', site.description),
})

const marqueeItems = [
  'Short films',
  'Documentary',
  'Music videos',
  'Commercials',
  'Reels & TikTok',
  'Brand campaigns',
  'Editorial portraits',
  'Events',
  'Travel',
]

const stats = [
  { value: '60+', label: 'Productions delivered' },
  { value: '25M', label: 'Organic social views' },
  { value: '9', label: 'Festival selections' },
]

function PortfolioHome() {
  const [active, setActive] = useState<Project | null>(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <>
      {/* Hero */}
      <section className="relative isolate min-h-[88vh] flex items-end overflow-hidden">
        <img
          src={cdn('/img/hero.png', 2000)}
          srcSet={`${cdn('/img/hero.png', 1000)} 1000w, ${cdn('/img/hero.png', 1600)} 1600w, ${cdn('/img/hero.png', 2400)} 2400w`}
          sizes="100vw"
          alt="Behind the scenes on a coastal film set at blue hour"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/40 to-background/10" />

        <div className="pointer-events-none absolute top-8 left-5 right-5 sm:left-8 sm:right-8 flex justify-between font-mono text-[0.68rem] uppercase tracking-[0.2em] text-white/70">
          <span className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-red-500 animate-pulse" />
            REC · Showreel 2026
          </span>
          <span className="hidden sm:inline">TC 01:00:24:12 · ISO 800 · 5600K</span>
        </div>

        <div className="max-w-7xl w-full mx-auto px-5 sm:px-8 pb-16 sm:pb-24">
          <p className="eyebrow text-white/80 mb-6 reveal">{site.role}</p>
          <h1 className="reveal font-display text-[3.4rem] sm:text-8xl lg:text-[9rem] leading-[0.88] tracking-tight max-w-5xl text-white">
            Stories in motion, <em className="text-primary">and in stills.</em>
          </h1>
          <div
            className="reveal mt-10 flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10"
            style={{ animationDelay: '150ms' }}
          >
            <p className="text-lg text-white/80 max-w-lg">
              I’m {site.name} — a director, cinematographer, social content
              creator and photographer based in Los Angeles.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/projects" className="contact-button">
                View the work <ArrowRight aria-hidden="true" size={16} />
              </Link>
              <Link to="/contact" className="btn-ghost text-white">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="border-y border-border/60 py-5 overflow-hidden" aria-hidden="true">
        <div className="marquee flex w-max gap-10 font-display italic text-3xl text-foreground/70">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              {item}
              <span className="text-primary not-italic text-xl">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Disciplines */}
      <section
        aria-labelledby="disciplines"
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-24"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">What I do</p>
            <h2 id="disciplines" className="font-display text-5xl sm:text-7xl leading-none">
              Three crafts, <em className="text-primary">one eye.</em>
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            Most clients come for one and stay for all three — the film, the
            feed and the frame, made by the same hands so it all feels like one
            story.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {disciplines.map((discipline) => (
            <Link
              key={discipline.id}
              to="/projects"
              search={{ category: discipline.id }}
              className="group relative isolate overflow-hidden rounded-md min-h-[30rem] flex flex-col justify-end p-6 border border-border/60 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              <img
                src={cdn(discipline.image, 900)}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover opacity-60 grayscale transition duration-700 group-hover:opacity-90 group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-background/70 to-transparent" />
              <span className="font-mono text-sm text-primary mb-auto">
                {discipline.index}
              </span>
              <h3 className="font-display text-4xl mb-3 flex items-center justify-between">
                {discipline.title}
                <ArrowUpRight
                  aria-hidden="true"
                  className="transition group-hover:text-primary group-hover:rotate-45"
                />
              </h3>
              <p className="text-foreground/75 mb-5">{discipline.blurb}</p>
              <ul className="flex flex-wrap gap-2">
                {discipline.services.map((service) => (
                  <li
                    key={service}
                    className="font-mono text-[0.65rem] uppercase tracking-[0.14em] border border-foreground/20 rounded-full px-3 py-1"
                  >
                    {service}
                  </li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured work */}
      <section
        aria-labelledby="featured-work"
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-28"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">Selected work</p>
            <h2 id="featured-work" className="font-display text-5xl sm:text-7xl leading-none">
              Recent highlights
            </h2>
          </div>
          <Link to="/projects" className="btn-ghost">
            All projects <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        {featuredProjects.length ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {featuredProjects.map((project) => (
              <WorkCard
                key={project._meta.path}
                project={project}
                onOpen={setActive}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No projects published yet.</p>
        )}
      </section>

      {/* About strip */}
      <section
        aria-labelledby="about-strip"
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-28 grid gap-12 lg:grid-cols-[1fr_1.3fr] items-center"
      >
        <div className="relative">
          <img
            src={cdn('/img/portrait.png', 900)}
            alt={`Portrait of ${site.name} holding a film camera in the studio`}
            loading="lazy"
            className="w-full aspect-square object-cover rounded-md"
          />
          <span className="absolute -bottom-4 -right-2 sm:-right-4 bg-primary text-primary-foreground font-mono text-xs uppercase tracking-[0.18em] px-4 py-2 rounded-full">
            {site.location}
          </span>
        </div>
        <div>
          <p className="eyebrow mb-4">About</p>
          <h2 id="about-strip" className="font-display text-5xl sm:text-6xl leading-[1.02] mb-6">
            From the set to the feed to the print.
          </h2>
          <p className="text-lg text-muted-foreground mb-10">{site.summary}</p>
          <dl className="grid grid-cols-3 gap-6 border-t border-border/60 pt-8 mb-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="eyebrow mb-2">{stat.label}</dt>
                <dd className="font-display text-5xl text-primary">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
          <Link to="/resume" className="btn-ghost">
            Credits & background <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
      </section>

      {/* Journal */}
      <section
        aria-labelledby="latest-writing"
        className="max-w-7xl mx-auto px-5 sm:px-8 pt-28"
      >
        <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
          <div>
            <p className="eyebrow mb-4">Journal</p>
            <h2 id="latest-writing" className="font-display text-5xl sm:text-7xl leading-none">
              Notes from set
            </h2>
          </div>
          <Link to="/blog" className="btn-ghost">
            All entries <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </div>
        {allBlogs.length ? (
          <ul className="divide-y divide-border/60 border-y border-border/60">
            {newestPosts(allBlogs)
              .slice(0, 3)
              .map((post) => (
                <li key={post.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="group grid gap-2 sm:grid-cols-[10rem_1fr_auto] sm:items-center py-7"
                  >
                    <time dateTime={post.date} className="eyebrow">
                      {formatDate(post.date)}
                    </time>
                    <span>
                      <span className="font-display text-3xl group-hover:text-primary transition-colors">
                        {post.title}
                      </span>
                      <span className="block text-muted-foreground mt-1">
                        {post.summary}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="hidden sm:block transition group-hover:text-primary group-hover:rotate-45"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        ) : (
          <p className="text-muted-foreground">No posts published yet.</p>
        )}
      </section>

      {active && <ProjectLightbox project={active} onClose={close} />}
    </>
  )
}
