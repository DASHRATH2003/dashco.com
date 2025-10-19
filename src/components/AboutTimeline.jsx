import Reveal from './Reveal';

const steps = [
  { year: '2019', title: 'Started freelancing', desc: 'Small business websites and landing pages.' },
  { year: '2020', title: 'Scaled projects', desc: 'Full‑stack apps, dashboards, integrations.' },
  { year: '2022', title: 'E‑commerce focus', desc: 'Performance‑oriented storefronts and SEO.' },
  { year: '2024', title: 'Design + Dev studio', desc: 'End‑to‑end solutions with animations.' },
];

export default function AboutTimeline() {
  return (
    <section id="journey" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Journey</h2>
        <p className="mt-2 text-white/70">Staggered cards — alternate directions for dynamic motion.</p>
      </Reveal>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        {steps.map((s, i) => (
          <Reveal key={s.year} delay={i * 120} direction={i % 2 ? 'right' : 'left'}>
            <div className="rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-5">
              <div className="text-xs uppercase tracking-widest text-pink-400/80">{s.year}</div>
              <div className="mt-1 text-white font-semibold text-lg">{s.title}</div>
              <p className="mt-1 text-white/70">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}