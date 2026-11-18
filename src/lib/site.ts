export const site = {
  name: 'Rowan Vale',
  role: 'Filmmaker, content creator & photographer',
  location: 'Los Angeles · Available worldwide',
  email: 'hello@rowanvale.studio',
  description:
    'Rowan Vale — director, cinematographer, social content creator and photographer telling stories in motion and in stills.',
  summary:
    'I make films, scroll-stopping social content, and photographs that feel lived-in. From commercial shoots and short documentaries to vertical-first brand campaigns and editorial portraits, I take projects from first idea to final grade.',
  socials: [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'Vimeo', href: 'https://vimeo.com' },
    { label: 'TikTok', href: 'https://tiktok.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
  ],
}

export const disciplines = [
  {
    id: 'film',
    index: '01',
    title: 'Film production',
    blurb:
      'Short films, documentaries, commercials and music videos — directing, shooting, and editing through to the final color grade.',
    services: ['Directing', 'Cinematography', 'Editing & color', 'Producing'],
    image: '/img/film-tide.png',
  },
  {
    id: 'social',
    index: '02',
    title: 'Social content',
    blurb:
      'Vertical-first campaigns, reels and creator-style stories built for the feed, with a strategy behind every cut.',
    services: ['Reels & TikTok', 'Campaign strategy', 'UGC direction', 'Motion graphics'],
    image: '/img/social-coffee.png',
  },
  {
    id: 'photography',
    index: '03',
    title: 'Photography',
    blurb:
      'Editorial portraits, travel, events and street photography — shot with patience, delivered with care.',
    services: ['Portraits', 'Editorial', 'Events', 'Travel & landscape'],
    image: '/img/photo-portrait.png',
  },
] as const

export type DisciplineId = (typeof disciplines)[number]['id']

export function cdn(src: string, width: number) {
  if (!src.startsWith('/')) return src
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${width}&fm=webp&q=80`
}

export function pageMeta(title: string, description: string) {
  const fullTitle = `${title} | ${site.name}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
    ],
  }
}
