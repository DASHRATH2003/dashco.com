import Reveal from './Reveal';

export default function ProjectsHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <Reveal direction="up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Portfolio</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Selected Projects & Case Studies</h1>
            <p className="mt-3 text-white/70 max-w-xl">Har card viewport me aate hi reveal hota hai. Hover par smooth scale, aur overall theme ke saath match karta gradient frame.</p>
          </div>
          <Reveal delay={140} direction="left">
            <div className="rounded-3xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-widest text-pink-400/80">Project types & approach</div>
              <div className="mt-3 space-y-3 text-white/80 text-sm">
                <p>Hum end‑to‑end custom business websites deliver karte hain — fast, secure aur SEO‑friendly.</p>
                <p>E‑commerce solutions me product catalog, cart, checkout aur payment gateway ka complete setup hota hai.</p>
                <p>Frontend SPA/SSR React + Vite se bana hota hai; responsive UI, smooth animations aur clean code.</p>
                <p>Backend/APIs ke liye proper authentication, databases, caching aur third‑party integrations implement karte hain.</p>
                <p>Mobile apps React Native ke saath build hote hain aur production releases ke standards follow karte hain.</p>
                <p>UI/UX design aur performance optimization bhi cover karte hain — wireframes se leke Core Web Vitals tak.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}