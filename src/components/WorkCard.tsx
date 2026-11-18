import { ArrowUpRight, Play } from 'lucide-react'
import type { Project } from 'content-collections'
import { cdn } from '../lib/site'

export const categoryLabel: Record<Project['category'], string> = {
  film: 'Film',
  social: 'Social',
  photography: 'Photography',
}

export function WorkCard({
  project,
  onOpen,
  priority = false,
}: {
  project: Project
  onOpen: (project: Project) => void
  priority?: boolean
}) {
  const isMotion = project.category !== 'photography'
  return (
    <article className="group break-inside-avoid mb-6">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="block w-full text-left rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        aria-label={`Open ${project.title}`}
      >
        <div className="relative overflow-hidden rounded-md bg-card">
          {project.image && (
            <img
              src={cdn(project.image, 900)}
              srcSet={`${cdn(project.image, 600)} 600w, ${cdn(project.image, 900)} 900w, ${cdn(project.image, 1400)} 1400w`}
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              alt={project.imageAlt ?? project.title}
              loading={priority ? 'eager' : 'lazy'}
              className="w-full h-auto object-cover transition duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-110"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-80 group-hover:opacity-100 transition-opacity" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] bg-black/55 backdrop-blur px-2 py-1 rounded-sm text-white">
              {categoryLabel[project.category]}
            </span>
          </div>
          {isMotion && (
            <span className="absolute top-3 right-3 grid place-items-center size-9 rounded-full bg-white/15 backdrop-blur text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Play aria-hidden="true" size={14} fill="currentColor" />
            </span>
          )}
          <div className="absolute bottom-0 inset-x-0 p-4 flex items-end justify-between gap-3 text-white">
            <div>
              <h3 className="font-display text-2xl sm:text-3xl leading-none">
                {project.title}
              </h3>
              {project.format && (
                <p className="font-mono text-[0.68rem] uppercase tracking-[0.15em] text-white/70 mt-2">
                  {project.format}
                </p>
              )}
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="shrink-0 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition"
            />
          </div>
        </div>
      </button>
    </article>
  )
}
