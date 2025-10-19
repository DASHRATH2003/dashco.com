import Reveal from './Reveal';

const skills = [
  { name: 'React / Vite', level: 92 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'Node.js / Express', level: 88 },
  { name: 'REST / GraphQL', level: 84 },
  { name: 'SEO & Performance', level: 90 },
  { name: 'UI/UX & Animations', level: 93 },
];

export default function SkillsGrid() {
  return (
    <section id="skills" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <h2 className="text-2xl md:text-3xl font-semibold text-white">Core Skills</h2>
        <p className="mt-2 text-white/70">Fully animated progress bars — jaise hi viewport me aayega, smooth fill effect.</p>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.name} delay={i * 100} direction={i % 2 ? 'left' : 'up'}>
            <div className="rounded-xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-4">
              <div className="flex justify-between text-sm text-white/80">
                <span>{s.name}</span>
                <span>{s.level}%</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-sky-500 transition-[width] duration-[1200ms] ease-out" style={{ width: 0 }} data-target={s.level}></div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// Progressive width when visible using MutationObserver+Intersection (applies to all bars)
if (typeof window !== 'undefined') {
  const apply = () => {
    document.querySelectorAll('[data-target]').forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const obs = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          // Trigger width animation after a microtask to ensure transition applies
          requestAnimationFrame(() => {
            el.style.width = target + '%';
          });
          obs.unobserve(el);
        }
      }, { threshold: 0.3 });
      obs.observe(el);
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', apply);
  } else {
    apply();
  }
}