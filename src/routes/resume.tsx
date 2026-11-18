import { createFileRoute, Link } from '@tanstack/react-router'
import { allJobs, allEducations } from 'content-collections'
import { ArrowRight } from 'lucide-react'
import { chronologicalEntries, formatDate } from '../lib/chronology'
import { cdn, disciplines, site, pageMeta } from '../lib/site'

export const Route = createFileRoute('/resume')({
  component: Resume,
  head: () =>
    pageMeta('About', `About ${site.name}: credits, background and services.`),
})

const kit = [
  'Cinema camera packages & anamorphic glass',
  'Gimbal, drone & handheld rigs',
  '35mm & medium-format film bodies',
  'Premiere Pro · DaVinci Resolve · After Effects',
  'Lightroom · Capture One',
]

function Range({ start, end }: { start: string; end?: string }) {
  return (
    <span className="eyebrow">
      <time dateTime={start}>{formatDate(start)}</time> —{' '}
      {end ? <time dateTime={end}>{formatDate(end)}</time> : 'Present'}
    </span>
  )
}

function Resume() {
  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16">
      <header className="reveal grid gap-12 lg:grid-cols-[1.3fr_1fr] items-end mb-24">
        <div>
          <p className="eyebrow mb-4">About</p>
          <h1 className="font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight mb-8">
            Hi, I’m {site.name.split(' ')[0]}.{' '}
            <em className="text-primary">I chase light for a living.</em>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {site.summary}
          </p>
        </div>
        <img
          src={cdn('/img/portrait.png', 900)}
          alt={`Portrait of ${site.name} in the studio`}
          className="w-full aspect-[4/5] object-cover rounded-md"
        />
      </header>

      <section aria-labelledby="services" className="mb-24">
        <h2 id="services" className="eyebrow mb-8">
          Services
        </h2>
        <div className="grid gap-px bg-border/60 md:grid-cols-3 border border-border/60 rounded-md overflow-hidden">
          {disciplines.map((d) => (
            <div key={d.id} className="bg-background p-8">
              <p className="font-mono text-sm text-primary mb-6">{d.index}</p>
              <h3 className="font-display text-4xl mb-4">{d.title}</h3>
              <ul className="space-y-2 text-foreground/80">
                {d.services.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section
        aria-labelledby="credits"
        className="grid gap-12 lg:grid-cols-[1fr_2.2fr] mb-24"
      >
        <h2 id="credits" className="font-display text-5xl">
          Credits
        </h2>
        {allJobs.length ? (
          <ol className="divide-y divide-border/60 border-y border-border/60">
            {chronologicalEntries(allJobs).map((job) => (
              <li key={job._meta.path} className="py-8 grid gap-3">
                <Range start={job.startDate} end={job.endDate} />
                <h3 className="font-display text-3xl">
                  {job.jobTitle}{' '}
                  <span className="text-muted-foreground">
                    — {job.company}
                    {job.location ? `, ${job.location}` : ''}
                  </span>
                </h3>
                <p className="text-foreground/85">{job.summary}</p>
                <div
                  className="prose prose-invert prose-sm max-w-none text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: job.html }}
                />
                <ul className="flex flex-wrap gap-2 mt-1">
                  {job.tags.map((tag) => (
                    <li
                      key={tag}
                      className="font-mono text-[0.65rem] uppercase tracking-[0.14em] border border-border rounded-full px-3 py-1 text-foreground/70"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-muted-foreground">No credits added yet.</p>
        )}
      </section>

      <section
        aria-labelledby="training"
        className="grid gap-12 lg:grid-cols-[1fr_2.2fr] mb-24"
      >
        <h2 id="training" className="font-display text-5xl">
          Training & kit
        </h2>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            {chronologicalEntries(allEducations).map((entry) => (
              <div key={entry._meta.path} className="mb-8">
                <Range start={entry.startDate} end={entry.endDate} />
                <h3 className="font-display text-3xl mt-3 mb-2">
                  {entry.school}
                </h3>
                <p className="text-muted-foreground">{entry.summary}</p>
                <div
                  className="prose prose-invert prose-sm max-w-none text-muted-foreground mt-2"
                  dangerouslySetInnerHTML={{ __html: entry.html }}
                />
              </div>
            ))}
          </div>
          <div>
            <p className="eyebrow mb-4">In the bag</p>
            <ul className="space-y-3">
              {kit.map((item) => (
                <li
                  key={item}
                  className="border-b border-border/60 pb-3 text-foreground/85"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Link to="/contact" className="contact-button">
        Book a call <ArrowRight aria-hidden="true" size={16} />
      </Link>
    </div>
  )
}
