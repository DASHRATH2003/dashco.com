import Reveal from './Reveal';

export default function ProjectsGallery() {
  const images = Object.values(import.meta.glob('../assets/project*.{png,jpg,jpeg,webp}', { eager: true }))
    .map((m) => m.default)
    .filter(Boolean);
  const phones = Object.values(import.meta.glob('../assets/mobile*.{png,jpg,jpeg,webp}', { eager: true }))
    .map((m) => m.default)
    .filter(Boolean);
  const pics = [...images, ...phones].slice(0, 9);

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Reveal direction="up">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Projects</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-white">A Glimpse into Our Work</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Grid cards animate on scroll; hover par subtle scale. Links optional.</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pics.map((src, i) => (
          <Reveal key={src + i} delay={i * 100} direction={i % 3 === 0 ? 'left' : 'up'} className="group">
            <figure className="overflow-hidden rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5">
              <img src={src} alt={`Project ${i + 1}`} className="h-48 w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <figcaption className="p-4">
                <div className="text-white font-medium">Project {i + 1}</div>
                <p className="mt-1 text-sm text-white/70">Modern UI, strong performance, and clean architecture.</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}