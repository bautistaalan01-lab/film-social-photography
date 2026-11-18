# Alan Bautista — Film · Social · Photography

A personal portfolio for a multidisciplinary creative working across **film production**, **social media content**, and **photography**. It has a cinematic dark design with film grain, an editorial serif, and a tungsten-amber accent, and it shows the work in a filterable masonry grid with a full-screen project viewer.

## Pages

- **Index (`/`)**: full-bleed showreel hero, a scrolling list of disciplines, three discipline cards (Film, Social, Photography), featured work, an about strip with stats, and the latest journal entries.
- **Work (`/projects`)**: every project in a masonry grid, with filters for All, Film, Social, and Photography. Filters are shareable URLs, such as `/projects?category=social`. Clicking a card opens a lightbox showing credits, a write-up, and tags. Arrow keys move between projects and Esc closes it.
- **About (`/resume`)**: bio, services, credits timeline, training, and kit list.
- **Journal (`/blog`, `/blog/:slug`)**: behind-the-scenes writing.
- **Contact (`/contact`)**: a Netlify Forms enquiry form with a project-type picker.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, deployed on Netlify
- [Content Collections](https://www.content-collections.dev/): Markdown files with Zod-validated frontmatter
- Tailwind CSS v4 + Typography
- Netlify Forms for contact enquiries
- Netlify Image CDN (`/.netlify/images`) for responsive WebP images

## Editing content

| What | Where |
| --- | --- |
| Name, tagline, email, socials, disciplines | `src/lib/site.ts` |
| Projects | `content/projects/*.md` |
| Journal posts | `content/blog/*.md` |
| Credits / experience | `content/jobs/*.md` |
| Training | `content/education/*.md` |
| Images | `public/img/` |

A project's frontmatter includes `category` (`film` \| `social` \| `photography`), `client`, `year`, `role`, `format`, `order`, `featured`, `image`, `imageAlt`, `tags`, and optional `videoUrl` and `liveUrl` fields. Set `videoUrl` to a Vimeo or YouTube **embed** URL to show a playable video in the lightbox in place of the still. The current name, projects, and images are sample placeholders. Replace them with your own.

## Running locally

```bash
npm install
netlify dev   # serves the site with Image CDN and Forms emulation
```

`npm test` runs the content and contact form tests.
