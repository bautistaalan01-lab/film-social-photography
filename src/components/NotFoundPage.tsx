import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-32 text-center">
      <p className="eyebrow mb-6">Scene missing · Error 404</p>
      <h1 className="font-display text-6xl sm:text-8xl leading-none mb-6">
        That one ended up <em className="text-primary">on the cutting room floor.</em>
      </h1>
      <p className="text-muted-foreground mb-10">
        This page or journal entry could not be found.
      </p>
      <Link to="/" className="contact-button">
        Back to the index
      </Link>
    </div>
  )
}
