import { createFileRoute } from '@tanstack/react-router'
import { ContactForm } from '../components/ContactForm'
import { pageMeta } from '../lib/site'

export const Route = createFileRoute('/contact')({
  component: ContactForm,
  head: () =>
    pageMeta('Contact', 'Start a film, social content or photography project with Rowan Vale.'),
})
