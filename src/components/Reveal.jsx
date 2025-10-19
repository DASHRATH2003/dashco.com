import { useEffect, useRef, useState } from 'react';

export default function Reveal({ children, as: Tag = 'div', className = '', delay = 0, direction = 'up' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const initialTransform =
    direction === 'up' ? 'translate-y-6' :
    direction === 'down' ? '-translate-y-6' :
    direction === 'left' ? 'translate-x-6' :
    '-translate-x-6'; // right

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0 translate-x-0 scale-100' : `opacity-0 ${initialTransform} scale-[0.98]`} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}