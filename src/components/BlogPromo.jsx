import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import project1 from '../assets/project1.jpg';
import project2 from '../assets/project2.jpg';
import project3 from '../assets/project3.jpg';

export default function BlogPromo() {
  const ref = useRef(null);
  const [enter, setEnter] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return setEnter(true);
    const io = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        setEnter(true);
        io.disconnect();
      }
    }, { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={ref} className="relative mx-4 md:mx-6 mt-10 md:mt-14 pointer-events-auto">
      {/* Glow background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-yellow-400/10 blur-3xl" />
        <div className="absolute left-[20%] bottom-0 h-60 w-60 rounded-full bg-indigo-500/10 blur-3xl" />
      </div>

      <div className={`grid items-center gap-6 md:grid-cols-2 rounded-2xl border border-white/10 bg-white/5 p-5 md:p-7 ring-1 ring-white/10 transition-all duration-500 ease-out ${enter ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        {/* Text */}
        <div>
          <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-indigo-300 bg-clip-text text-transparent animate-shine">
            Explore our Blog
          </div>
          <p className="mt-2 text-white/70 text-sm md:text-base leading-relaxed">
            Case studies, tutorials, and behind-the-scenes of our projects. Learn modern web dev tricks, product strategy, and how we ship fast.
          </p>
          <div className="mt-4">
            <Link to="/blog" className="inline-flex items-center gap-2 rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-black hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60">
              Read Blog
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>

        {/* Images grid */}
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          {[project1, project2, project3].map((src, i) => (
            <div key={i} className="relative overflow-hidden rounded-2xl ring-1 ring-white/10 bg-white/10">
              <img src={src} alt={`Blog image ${i+1}`} className="h-28 md:h-32 w-full object-cover transform transition duration-500 ease-out hover:scale-[1.06]" />
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute inset-0 ${i % 2 === 0 ? 'animate-float-slow' : 'animate-float-slower'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}