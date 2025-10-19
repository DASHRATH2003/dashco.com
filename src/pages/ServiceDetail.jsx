import { useMemo } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { servicesDetails, servicesList } from '../data/services.js';

export default function ServiceDetail() {
  const { slug } = useParams();
  const detail = servicesDetails[slug];
  const meta = useMemo(() => servicesList.find(s => s.slug === slug), [slug]);

  if (!detail) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="text-white">Service not found.</div>
        <NavLink to="/services" className="mt-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">Back to Services</NavLink>
      </section>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Service</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">{detail.hero}</h1>
            <p className="mt-3 text-white/70 max-w-2xl">{detail.overview}</p>
          </div>
          <div className="hidden md:flex gap-3">
            <NavLink to="/contact" className="inline-flex rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">Get Quote</NavLink>
            <NavLink to="/projects" className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">View Projects</NavLink>
          </div>
        </div>
      </Reveal>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Reveal direction="left">
          <div className="rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">Key Features</div>
            <ul className="mt-2 space-y-2 text-white/80 text-sm">
              {detail.features.map((f) => (
                <li key={f} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-pink-400"></span>{f}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal direction="right" delay={120}>
          <div className="rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-6">
            <div className="text-white font-semibold">Deliverables</div>
            <ul className="mt-2 space-y-2 text-white/80 text-sm">
              {detail.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-indigo-400"></span>{d}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <Reveal delay={240} direction="up">
        <div className="mt-8 rounded-2xl border border-white/10 ring-1 ring-white/10 bg-gradient-to-r from-indigo-500/15 via-fuchsia-500/15 to-sky-500/15 p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="text-white font-semibold text-lg">Ready to get started?</div>
              <p className="text-white/70">Discuss requirements, timeline, and budget. I’ll suggest the best approach for {meta?.title || 'your project'}.</p>
            </div>
            <div className="flex gap-3">
              <NavLink to="/contact" className="inline-flex rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">Get Quote</NavLink>
              <NavLink to="/services" className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">All Services</NavLink>
            </div>
          </div>
        </div>
      </Reveal>
    </main>
  );
}