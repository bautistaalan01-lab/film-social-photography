import { Link } from '@tanstack/react-router'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../lib/site'

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 mt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <p className="eyebrow mb-4">Now booking 2027 productions</p>
          <Link
            to="/contact"
            className="group font-display text-4xl sm:text-5xl leading-[1.05] hover:text-primary transition-colors"
          >
            Have a story worth telling?{' '}
            <span className="italic text-primary group-hover:text-foreground transition-colors">
              Let’s make it.
            </span>
          </Link>
        </div>
        <div>
          <p className="eyebrow mb-4">Contact</p>
          <a
            href={`mailto:${site.email}`}
            className="block hover:text-primary transition-colors"
          >
            {site.email}
          </a>
          <p className="text-muted-foreground mt-2">{site.location}</p>
        </div>
        <div>
          <p className="eyebrow mb-4">Follow</p>
          <ul className="space-y-2">
            {site.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-primary transition-colors"
                >
                  {social.label}
                  <ArrowUpRight aria-hidden="true" size={14} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-10 flex flex-wrap justify-between gap-4 eyebrow">
        <span>
          © {new Date().getFullYear()} {site.name}
        </span>
        <span>Shot, cut & graded with care</span>
      </div>
    </footer>
  )
}
