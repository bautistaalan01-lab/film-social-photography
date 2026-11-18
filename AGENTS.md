# AGENTS.md

A personal creative portfolio covering film production, social content, and photography, built with TanStack Start, React 19, Content Collections, and Tailwind v4, and deployed on Netlify. It has no database and no auth. All content is local Markdown, and the contact form uses Netlify Forms.

## Key files

- `src/lib/site.ts`: identity (name, role, email, socials), the `disciplines` list (id, title, blurb, services, image), `cdn(src, width)` for building Netlify Image CDN URLs, and `pageMeta`.
- `src/lib/content.ts` + `content-collections.ts`: Zod schemas and sanitized Markdown rendering. `projectSchema` has `category` (enum, defaults to `film`), `client`, `year`, `role`, `format`, `order`, `featured`, `videoUrl`, `liveUrl`, `github`, `image`, and `imageAlt`.
- `src/lib/projects.ts`: `sortedProjects` (by `order`, then by year) and `featuredProjects`.
- `src/components/WorkCard.tsx`: masonry card. `ProjectLightbox.tsx`: full-screen modal with Esc and arrow-key navigation, focus restore, and scroll lock. It shows an iframe when `videoUrl` is set.
- `src/components/SiteHeader.tsx` / `SiteFooter.tsx`: sticky nav with a mobile menu, and the footer CTA.
- Routes: `index.tsx` (home), `projects.tsx` (Work, using the `?category=` search param validated with zod), `resume.tsx` (About), `blog/` (Journal), `contact.tsx`.
- `public/contact.html`: static Netlify Forms registration. Its field names must match `ContactForm.tsx` exactly, including all four `projectType` radio inputs. A test enforces this.
- `public/img/`: AI-generated sample imagery (PNG). Always reference images through `cdn()` and never link the originals directly.

## Conventions

- The site uses a dark theme only (`<html class="dark">`). Colors come from CSS variables in `src/styles.css`. Accent = `primary` (amber).
- Typography: `font-display` (Instrument Serif) for headings, `font-mono` (JetBrains Mono) via the `.eyebrow` utility for metadata labels, and Inter Tight for body text. All three load from Google Fonts in `__root.tsx`.
- Utility classes in `styles.css`: `.eyebrow`, `.contact-button` (primary pill), `.btn-ghost`, `.reveal` (entrance animation), `.marquee`, and `.grain` (film-grain overlay on body). All of them respect `prefers-reduced-motion`.
- Use `prose prose-invert` for rendered Markdown.
- Use quoted `YYYY-MM-DD` dates in frontmatter.
- Don't run build or dev commands to validate. The pipeline validates the build.

## Possible next steps

Add real Vimeo/YouTube embed URLs to film projects, replace the sample identity and images, add a per-project detail route if deep links are wanted, and add a client logo strip.
