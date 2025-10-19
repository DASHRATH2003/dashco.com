import Reveal from './Reveal';

export default function BlogHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
      <Reveal direction="up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Insights</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Blog & Tutorials</h1>
            <p className="mt-3 text-white/70 max-w-xl">Clean code, performance, aur UI/UX tips — sab kuch yahan. Cards smooth motion se appear hote hain.</p>
          </div>
          <Reveal delay={140} direction="left">
            <div className="rounded-3xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-6">
              <div className="text-sm uppercase tracking-widest text-pink-400/80">Kis type ke articles</div>
              <div className="mt-3 space-y-3 text-white/80 text-sm">
                <p>Clean code practices aur real‑world React patterns jo production me kaam aate hain.</p>
                <p>Performance tuning — bundle size, caching, lazy loading, Core Web Vitals improvements.</p>
                <p>UI/UX tips — accessible components, micro‑interactions, design systems aur consistency.</p>
                <p>Backend & APIs — auth flows, database design, error handling aur logging best practices.</p>
                <p>E‑commerce playbooks — checkout, payments, security aur growth focused patterns.</p>
                <p>Developer guides — tooling, CI/CD, testing strategy, aur maintainable architecture.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}