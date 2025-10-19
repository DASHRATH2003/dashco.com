import { servicesList } from '../data/services.js'
import { NavLink } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'

export default function Services() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <Reveal direction="up">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Services</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Websites I Build & Sell</h1>
          <p className="mt-3 text-white/60">Choose from ready‑to‑go website types or request a custom build.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {servicesList.map((s, idx) => (
          <Reveal key={s.slug} delay={idx * 120} direction={idx % 2 ? 'left' : 'up'}>
            <article id={s.slug} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/10">
              <div className="p-5">
                <h2 className="text-xl font-semibold text-white">{s.title}</h2>
                <p className="mt-2 text-sm text-white/70">{s.blurb}</p>
              </div>
              <div className="flex items-center justify-between px-5 pb-5">
                <NavLink to={`/services/${s.slug}`} className="text-pink-300 text-sm">View details ↗</NavLink>
                <NavLink to="/contact" className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-pink-700">Get Quote</NavLink>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}