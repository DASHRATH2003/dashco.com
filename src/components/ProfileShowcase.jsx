import { NavLink } from 'react-router-dom';
import Reveal from './Reveal';
import ProjectsCarousel from './ProjectsCarousel.jsx';
import SocialLinksSection from './SocialLinksSection.jsx'

export default function ProfileShowcase() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* subtle gradient glow background to match app */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-600/20 via-fuchsia-500/10 to-sky-400/10 blur-3xl" />
      </div>

      {/* Header */}
      

      {/* Projects */}
      <div className="mt-2">
        

        {/* Auto-scrolling Projects Carousel */}
        <div className="mt-2">
          <Reveal direction="up">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-3 ring-1 ring-white/10">
              <ProjectsCarousel />
            </div>
          </Reveal>
        </div>

        {/* Social links section under Projects */}
        <div className="mt-6">
          <SocialLinksSection />
        </div>
      </div>

      {/* Services */}
      <div className="mt-8">
        <Reveal direction="up">
          <h3 className="text-2xl font-semibold text-white">Services</h3>
          <p className="text-white/60">End‑to‑end solutions: design, build, optimize, and deploy.</p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {k:'Custom Websites', d:'Pixel‑perfect UI, responsive, accessible.'},
            {k:'SaaS & Dashboards', d:'Multi‑tenant apps, role‑based access.'},
            {k:'APIs & Integrations', d:'REST/GraphQL, third‑party services.'},
            {k:'E‑commerce', d:'Payments, carts, inventory.'},
            {k:'Performance & SEO', d:'Core Web Vitals, best practices.'},
            {k:'Deployments', d:'Docker, AWS, CI/CD.'},
          ].map((s, i)=> (
            <Reveal key={s.k} direction="up" delay={i*80}>
              <div className="group rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-1 hover:bg-white/7">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-lg bg-gradient-to-tr from-indigo-500/40 via-fuchsia-500/30 to-sky-500/40 animate-pulse-glow" />
                  <h4 className="text-white font-semibold">{s.k}</h4>
                </div>
                <p className="mt-3 text-white/70">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* About */}
      <div className="mt-8">
        <Reveal direction="up">
          <h3 className="text-2xl font-semibold text-white">About</h3>
          <p className="text-white/60">Brief timeline and values — focused on reliability and scale.</p>
        </Reveal>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {y:'2012→', t:'Started building production apps', d:'Delivering business‑focused web solutions.'},
            {y:'2016→', t:'Scaling teams & products', d:'Spearheaded dashboards, APIs, and DevOps.'},
            {y:'2022→', t:'Modern stacks', d:'Next.js, TypeScript, Docker, AWS.'},
          ].map((a, i)=> (
            <Reveal key={a.t} direction="up" delay={i*120}>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
                <div className="text-pink-300 font-semibold">{a.y}</div>
                <div className="mt-1 text-white font-semibold">{a.t}</div>
                <p className="mt-2 text-white/70">{a.d}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <NavLink to="/about" className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-indigo-700">Know More</NavLink>
          <NavLink to="/services" className="rounded-full bg-fuchsia-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-fuchsia-700">All Services</NavLink>
        </div>
      </div>
    </section>
  );
}