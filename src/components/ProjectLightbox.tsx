import { useEffect, useRef } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink, X } from 'lucide-react'
import type { Project } from 'content-collections'
import { cdn } from '../lib/site'
import { categoryLabel } from './WorkCard'

export function ProjectLightbox({
  project,
  onClose,
  onPrev,
  onNext,
}: {
  project: Project
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowLeft') onPrev?.()
      if (event.key === 'ArrowRight') onNext?.()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = overflow
      previous?.focus()
    }
  }, [onClose, onPrev, onNext])

  const vertical = project.category === 'social'
  const details = [
    ['Client', project.client],
    ['Role', project.role],
    ['Format', project.format],
    ['Year', project.year?.toString()],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-title"
      className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-300"
      onClick={(event) => event.target === event.currentTarget && onClose()}
    >
      <div className="sticky top-0 flex justify-between items-center px-5 sm:px-8 h-16 text-white">
        <span className="eyebrow text-white/60">
          {categoryLabel[project.category]}
          {project.year ? ` · ${project.year}` : ''}
        </span>
        <div className="flex items-center gap-2">
          {onPrev && (
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous project"
              className="p-2 rounded-full hover:bg-white/10"
            >
              <ArrowLeft size={20} />
            </button>
          )}
          {onNext && (
            <button
              type="button"
              onClick={onNext}
              aria-label="Next project"
              className="p-2 rounded-full hover:bg-white/10"
            >
              <ArrowRight size={20} />
            </button>
          )}
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-2 rounded-full hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>
      </div>
      <div
        className={`max-w-7xl mx-auto px-5 sm:px-8 pb-16 grid gap-10 text-white ${vertical ? 'lg:grid-cols-[minmax(0,420px)_1fr]' : 'lg:grid-cols-[2fr_1fr]'}`}
      >
        <div className="animate-in zoom-in-95 duration-500">
          {project.videoUrl ? (
            <div className="aspect-video rounded-md overflow-hidden bg-black">
              <iframe
                src={project.videoUrl}
                title={project.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          ) : (
            project.image && (
              <img
                src={cdn(project.image, 1800)}
                alt={project.imageAlt ?? project.title}
                className="w-full h-auto rounded-md"
              />
            )
          )}
        </div>
        <div>
          <h2
            id="lightbox-title"
            className="font-display text-5xl sm:text-6xl leading-none mb-5"
          >
            {project.title}
          </h2>
          <p className="text-lg text-white/80 mb-8">{project.description}</p>
          {details.length > 0 && (
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/15 py-6 mb-8">
              {details.map(([label, value]) => (
                <div key={label}>
                  <dt className="eyebrow text-white/50 mb-1">{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          )}
          <div
            className="prose prose-invert prose-sm max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: project.html }}
          />
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[0.68rem] uppercase tracking-[0.14em] border border-white/20 rounded-full px-3 py-1 text-white/75"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-button"
            >
              Watch / view project <ExternalLink aria-hidden="true" size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
