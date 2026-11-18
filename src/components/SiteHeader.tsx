import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { site } from '../lib/site'

const links = [
  { to: '/', label: 'Index' },
  { to: '/projects', label: 'Work' },
  { to: '/resume', label: 'About' },
  { to: '/blog', label: 'Journal' },
  { to: '/contact', label: 'Contact' },
] as const

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-3 group"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="size-2.5 rounded-full bg-red-500 shadow-[0_0_12px_2px] shadow-red-500/60 animate-pulse"
          />
          <span className="font-display text-2xl leading-none tracking-tight">
            {site.name}
          </span>
          <span className="hidden md:inline eyebrow">Film · Social · Photo</span>
        </Link>
        <nav aria-label="Main navigation" className="hidden sm:flex gap-7">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              activeOptions={{ exact: link.to === '/' }}
              activeProps={{ className: 'text-primary' }}
              inactiveProps={{
                className: 'text-foreground/70 hover:text-foreground',
              }}
              className="font-mono text-xs uppercase tracking-[0.18em] transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <button
          type="button"
          className="sm:hidden p-2 -mr-2"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="sm:hidden border-t border-border/60 px-5 py-6 flex flex-col gap-5"
        >
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: link.to === '/' }}
              activeProps={{ className: 'text-primary' }}
              className="font-display text-3xl"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
