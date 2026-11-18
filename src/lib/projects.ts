import { allProjects, type Project } from 'content-collections'

export const sortedProjects: Project[] = [...allProjects].sort(
  (a, b) =>
    a.order - b.order ||
    (b.year ?? 0) - (a.year ?? 0) ||
    a._meta.path.localeCompare(b._meta.path),
)

export const featuredProjects = sortedProjects.filter((p) => p.featured)
