import { useRef, useState, type FormEvent } from 'react'
import { Mail, Send } from 'lucide-react'
import { site } from '../lib/site'

const projectTypes = [
  'Film production',
  'Social content',
  'Photography',
  'A bit of everything',
]

export function ContactForm() {
  const [status, setStatus] = useState<
    'idle' | 'pending' | 'error' | 'success'
  >('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const body = new URLSearchParams()
    new FormData(event.currentTarget).forEach((value, key) =>
      body.append(key, String(value)),
    )
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch('/contact.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Message was not accepted')
      setStatus('success')
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 grid gap-16 lg:grid-cols-[1fr_1.2fr]">
      <div className="reveal">
        <p className="eyebrow mb-4">Contact</p>
        <h1 className="font-display text-6xl sm:text-8xl leading-[0.9] tracking-tight mb-8">
          Let’s make <em className="text-primary">something.</em>
        </h1>
        <p className="text-lg text-muted-foreground max-w-md mb-10">
          Tell me about your film, campaign or shoot — timelines, budget
          range and the feeling you’re after. I reply within two working days.
        </p>
        <dl className="space-y-6">
          <div>
            <dt className="eyebrow mb-1">Email</dt>
            <dd>
              <a
                href={`mailto:${site.email}`}
                className="font-display text-2xl sm:text-3xl break-all hover:text-primary transition-colors"
              >
                {site.email}
              </a>
            </dd>
          </div>
          <div>
            <dt className="eyebrow mb-1">Based in</dt>
            <dd className="text-foreground/85">{site.location}</dd>
          </div>
        </dl>
      </div>
      <div className="rounded-md border border-border/60 bg-card/60 p-6 sm:p-10">
      {status === 'success' ? (
        <div className="text-center py-8">
          <Mail aria-hidden="true" className="w-8 h-8 mx-auto mb-4 text-primary" />
          <h2 className="font-display text-4xl mb-2">Message received</h2>
          <p role="status" className="mb-6">
            Thanks for reaching out — I’ll be in touch soon.
          </p>
          <button
            type="button"
            className="contact-button"
            onClick={() => setStatus('idle')}
          >
            Send another message
          </button>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          action="/contact.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          aria-busy={status === 'pending'}
          onSubmit={submit}
          className="space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Leave this empty
              <input name="bot-field" tabIndex={-1} autoComplete="off" />
            </label>
          </p>
          <fieldset
            disabled={status === 'pending'}
            className="min-w-0 space-y-6 disabled:opacity-70"
          >
            <legend className="sr-only">Your message</legend>
            <div>
              <span className="eyebrow block mb-3">I’m interested in</span>
              <div className="flex flex-wrap gap-2">
                {projectTypes.map((type, index) => (
                  <label key={type} className="cursor-pointer">
                    <input
                      type="radio"
                      name="projectType"
                      value={type}
                      defaultChecked={index === 0}
                      className="peer sr-only"
                    />
                    <span className="inline-block font-mono text-xs uppercase tracking-[0.14em] px-4 py-2 rounded-full border border-border text-foreground/75 transition-colors peer-checked:bg-primary peer-checked:text-primary-foreground peer-checked:border-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary">
                      {type}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label
                htmlFor="name"
                className="eyebrow block"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                className="contact-input"
                placeholder="Your name"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="eyebrow block"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={254}
                className="contact-input"
                placeholder="you@studio.com"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="eyebrow block"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={5000}
                rows={6}
                className="contact-input"
                placeholder="The story, the timeline, the vibe…"
              />
            </div>
            <button type="submit" className="contact-button">
              <Send aria-hidden="true" size={16} />
              {status === 'pending' ? 'Sending…' : 'Send message'}
            </button>
          </fieldset>
          <p role="status" className="sr-only">
            {status === 'pending' ? 'Sending your message…' : ''}
          </p>
          {status === 'error' && (
            <p role="alert" className="text-destructive">
              We couldn’t confirm your message. Your details are still here;
              please try again. Local previews don’t process submissions.
            </p>
          )}
        </form>
      )}
      </div>
    </div>
  )
}
