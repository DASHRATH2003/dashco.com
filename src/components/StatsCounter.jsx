import { useEffect, useRef, useState } from 'react';

export default function StatsCounter({ value = 100, duration = 1200, prefix = '', suffix = '', className = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const start = performance.now();
        const easeOut = (t) => 1 - Math.pow(1 - t, 3);
        const step = (now) => {
          const p = Math.min(1, (now - start) / duration);
          const eased = easeOut(p);
          setCount(Math.round(eased * value));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.unobserve(el);
      }
    }, { threshold: 0.3 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <div ref={ref} className={`text-3xl md:text-4xl font-bold text-white ${className}`}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}