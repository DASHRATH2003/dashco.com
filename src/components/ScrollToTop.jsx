import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  // Scroll to top on route (pathname) change
  useEffect(() => {
    if (hash) return; // let hash handling take over
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname, hash]);

  // Smoothly scroll to element when there is a hash
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return null;
}