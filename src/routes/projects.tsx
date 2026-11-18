import { useCallback, useMemo, useState } from 'react'
import { createFileRoute, Link } from '@tanstack/react-router'
import type { Project } from 'content-collections'
import { z } from 'zod'
import { ProjectLightbox } from '../components/ProjectLightbox'
import { WorkCard } from '../components/WorkCard'
import { disciplines, pageMeta } from '../lib/site'
import { sortedProjects } from '../lib/projects'

const searchSchema = z.object({
  category: z.enum(['film', 'social', 'photography']).optional().catch(undefined),
})

export const Route = createFileRoute('/projects')({
  validateSearch: searchSchema,
  component: Projects,
  head: () =>
    pageMeta(
      'Work',
      'Selected films, social campaigns and photography by Rowan Vale.',
    ),
})

const filters = [
  { id: undefined, label: 'All work' },
  ...disciplines.map((d) => ({ id: d.id, label: d.title })),
] as const

function Projects() {
  const { category } = Route.useSearch()
  const visible = useMemo(
    () =>
      category
        ? sortedProjects.filter((p) => p.category === category)
        : sortedProjects,
    [category],
  )
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const open = (project: Project) => setOpenIndex(visible.indexOf(project))
  const close = useCallback(() => setOpenIndex(null), [])
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? i : (i - 1 + visible.length) % visible.length,
      ),
    [visible.length],
  )
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? i : (i + 1) % visible.length)),
    [visible.length],
  )
  const active = openIndex === null ? undefined : visible[openIndex]
  const discipline = disciplines.find((d) => d.id === category)

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8">
      <header className="reveal mb-12 grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
        <div>
          <p className="eyebrow mb-4">
            Selected work · {String(visible.length).padStart(2, '0')} projects
          </p>
          <h1 className="font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight">
            {discipline ? discipline.title : 'The work'}
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl">
          {discipline
            ? discipline.blurb
            : 'Films, feeds and frames. Filter by discipline, then open any project for the full story, credits and stills.'}
        </p>
      </header>

      <nav
        aria-label="Filter by discipline"
        className="flex flex-wrap gap-2 mb-10 border-b border-border/60 pb-6"
      >
        {filters.map((filter) => {
          const selected = filter.id === category
          return (
            <Link
              key={filter.label}
              to="/projects"
              search={filter.id ? { category: filter.id } : {}}
              aria-current={selected ? 'page' : undefined}
              className={`font-mono text-xs uppercase tracking-[0.16em] px-4 py-2 rounded-full border transition-colors ${
                selected
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:border-foreground/50 text-foreground/75'
              }`}
            >
              {filter.label}
            </Link>
          )
        })}
      </nav>

      {visible.length ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {visible.map((project, index) => (
            <WorkCard
              key={project._meta.path}
              project={project}
              onOpen={open}
              priority={index < 3}
            />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No projects published yet.</p>
      )}

      {active && (
        <ProjectLightbox
          project={active}
          onClose={close}
          onPrev={visible.length > 1 ? prev : undefined}
          onNext={visible.length > 1 ? next : undefined}
        />
      )}
    </div>
  )
}
