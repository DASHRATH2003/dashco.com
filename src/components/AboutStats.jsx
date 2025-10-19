import Reveal from './Reveal';
import StatsCounter from './StatsCounter';

export default function AboutStats() {
  const stats = [
    { label: 'Projects Delivered', value: 48, suffix: '+' },
    { label: 'Satisfied Clients', value: 30, suffix: '+' },
    { label: 'Avg. PageSpeed', value: 95, suffix: '/100' },
    { label: 'Years Experience', value: 5, suffix: '+' },
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Reveal direction="up">
        <div className="rounded-2xl border border-white/10 ring-1 ring-white/10 bg-gradient-to-r from-indigo-500/15 via-fuchsia-500/15 to-sky-500/15 p-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 100} direction={i % 2 ? 'left' : 'up'}>
                <div className="">
                  <StatsCounter value={s.value} suffix={s.suffix} />
                  <div className="mt-1 text-white/70 text-sm">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}