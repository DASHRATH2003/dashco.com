import Reveal from './Reveal';

export default function SocialLinksSection() {
  const socials = [
    {
      name: 'GitHub',
      href: 'https://github.com/',
      color: 'from-gray-300/30 via-gray-400/20 to-indigo-500/20',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M12 .5a12 12 0 0 0-3.79 23.41c.6.11.82-.26.82-.58v-2.03c-3.35.73-4.06-1.61-4.06-1.61-.55-1.41-1.33-1.78-1.33-1.78-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-.67-.08-1.38-.34-2.01-.84-2.72-.64-3.3-3.44-3.3-3.44-.51-1.3-.93-2.14-.93-2.14-.53-1.25.04-1.23.04-1.23 1.18.08 1.8 1.21 1.8 1.21 1.04 1.77 2.73 1.26 3.39.96.11-.76.4-1.26.74-1.55-2.68-.31-5.5-1.34-5.5-6a4.78 4.78 0 0 1 1.28-3.3c-.13-.32-.56-1.6.12-3.33 0 0 1.05-.34 3.44 1.25a11.8 11.8 0 0 1 6.26 0c2.39-1.59 3.44-1.25 3.44-1.25.68 1.73.25 3.01.12 3.33a4.78 4.78 0 0 1 1.28 3.3c0 4.67-2.83 5.69-5.53 5.99.42.36.8 1.08.8 2.18v3.24c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>
        </svg>
      ),
      tagline: 'Open‑source repos & experiments'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/',
      color: 'from-blue-300/30 via-indigo-400/20 to-sky-500/20',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.45V9h3.41v1.56h.05c.47-.88 1.62-1.8 3.34-1.8 3.57 0 4.23 2.35 4.23 5.42v6.27ZM6.27 7.44A2.07 2.07 0 1 1 6.27 3.3a2.07 2.07 0 0 1 0 4.14ZM4.49 20.45h3.56V9H4.49v11.45Z"/>
        </svg>
      ),
      tagline: 'Professional updates & achievements'
    },
    {
      name: 'Twitter (X)',
      href: 'https://twitter.com/',
      color: 'from-sky-400/30 via-indigo-400/20 to-fuchsia-500/20',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.87-2.36 8.62 8.62 0 0 1-2.72 1.04 4.26 4.26 0 0 0-7.26 3.89A12.1 12.1 0 0 1 3.15 4.6a4.25 4.25 0 0 0 1.32 5.68 4.21 4.21 0 0 1-1.93-.53v.06a4.26 4.26 0 0 0 3.42 4.08 4.2 4.2 0 0 1-1.92.07 4.26 4.26 0 0 0 3.98 2.96A8.55 8.55 0 0 1 2 18.41a12.07 12.07 0 0 0 6.54 1.92c7.85 0 12.14-6.5 12.14-12.13 0-.18 0-.35-.01-.53A8.67 8.67 0 0 0 24 4.56a8.48 8.48 0 0 1-2.54.7Z"/>
        </svg>
      ),
      tagline: 'Thoughts, threads & quick tips'
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/',
      color: 'from-pink-400/30 via-purple-400/20 to-yellow-400/20',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 4a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-1.8a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>
        </svg>
      ),
      tagline: 'Visual stories & behind‑the‑scenes'
    },
    {
      name: 'Facebook',
      href: 'https://facebook.com/',
      color: 'from-blue-400/30 via-indigo-400/20 to-sky-400/20',
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
          <path d="M13 22V12h3.5l.5-4H13V6.5c0-1 .33-1.5 1.6-1.5H17V2h-2.5C11.4 2 10 3.7 10 6.3V8H7v4h3v10h3Z"/>
        </svg>
      ),
      tagline: 'Community updates & events'
    },
  ];

  return (
    <section className="mt-8">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-semibold text-white">Connect & Follow</h3>
            <p className="mt-1 text-white/70 max-w-2xl">Latest updates, project drops and behind‑the‑scenes. Follow me on your favourite platforms. Links below are placeholders — update to your real profiles.</p>
          </div>
          <a href="/contact" className="hidden sm:inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">Contact</a>
        </div>
      </Reveal>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {socials.map((s, i) => (
          <Reveal key={s.name} direction="up" delay={i*80}>
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.name}
              className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10 hover:bg-white/8 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${s.color} text-white/90 ring-1 ring-white/10`}>{s.icon}</div>
                <div>
                  <div className="text-white font-semibold">{s.name}</div>
                  <div className="text-white/60 text-sm">{s.tagline}</div>
                </div>
              </div>
              <div className="text-white/50 group-hover:text-indigo-300 transition-transform group-hover:translate-x-0.5" aria-hidden="true">
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}