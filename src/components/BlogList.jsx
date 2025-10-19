import Reveal from './Reveal';

const posts = [
  { slug: 'improving-pagespeed', title: 'Improving PageSpeed: Practical Tips', excerpt: 'Code‑splitting, caching, image optimization — actionable steps to raise scores.' },
  { slug: 'react-animations', title: 'Delightful React Animations', excerpt: 'Subtle motion design patterns using CSS and IntersectionObserver.' },
  { slug: 'seo-basics', title: 'SEO Basics for New Sites', excerpt: 'Structure content, meta tags, and sitemap to help indexing.' },
];

export default function BlogList() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <Reveal direction="up">
        <div className="flex items-end justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Blog</div>
            <h2 className="mt-1 text-2xl md:text-3xl font-semibold text-white">Latest Articles</h2>
            <p className="mt-2 text-white/70 max-w-2xl">Staggered reveal cards — neat hover and responsive grid.</p>
          </div>
        </div>
      </Reveal>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 120} direction={i % 2 ? 'left' : 'up'}>
            <article className="rounded-2xl border border-white/10 ring-1 ring-white/10 bg-white/5 p-5">
              <div className="text-white font-semibold">{p.title}</div>
              <p className="mt-2 text-sm text-white/70">{p.excerpt}</p>
              <div className="mt-4 text-pink-300 text-sm">Read more →</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}