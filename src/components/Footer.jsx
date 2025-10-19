import { NavLink } from 'react-router-dom';
import { servicesNav } from '../data/services';
import logo from '../assets/logo.png'; // Update path as required

export default function Footer() {
  const year = new Date().getFullYear();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/projects', label: 'Projects' },
    { to: '/services', label: 'Services' },
    { to: '/about', label: 'About' },
    { to: '/blog', label: 'Blog' },
    { to: '/contact', label: 'Contact' },
  ];
  const legal = [
    { href: '/privacy-policy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/refund-policy', label: 'Refund & Cancellation' },
    { href: '/return-policy', label: 'Return Policy' },
  ];

  // SVG icons for social/contact
  const icons = {
    github: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M12 .5a12 12 0 0 0-3.79 23.41c.6.11.82-.26.82-.58v-2.03c-3.35.73-4.06-1.61-4.06-1.61-.55-1.41-1.33-1.78-1.33-1.78-1.09-.75.08-.74.08-.74 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-.67-.08-1.38-.34-2.01-.84-2.72-.64-3.3-3.44-3.3-3.44-.51-1.3-.93-2.14-.93-2.14-.53-1.25.04-1.23.04-1.23 1.18.08 1.8 1.21 1.8 1.21 1.04 1.77 2.73 1.26 3.39.96.11-.76.4-1.26.74-1.55-2.68-.31-5.5-1.34-5.5-6a4.78 4.78 0 0 1 1.28-3.3c-.13-.32-.56-1.6.12-3.33 0 0 1.05-.34 3.44 1.25a11.8 11.8 0 0 1 6.26 0c2.39-1.59 3.44-1.25 3.44-1.25.68 1.73.25 3.01.12 3.33a4.78 4.78 0 0 1 1.28 3.3c0 4.67-2.83 5.69-5.53 5.99.42.36.8 1.08.8 2.18v3.24c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M20.45 20.45h-3.56v-5.4c0-1.29-.02-2.95-1.8-2.95-1.8 0-2.08 1.4-2.08 2.85v5.5H9.45V9h3.41v1.56h.05c.47-.88 1.62-1.8 3.34-1.8 3.57 0 4.23 2.35 4.23 5.42v6.27ZM6.27 7.44A2.07 2.07 0 1 1 6.27 3.3a2.07 2.07 0 0 1 0 4.14ZM4.49 20.45h3.56V9H4.49v11.45Z"/>
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 0 0 1.87-2.36 8.62 8.62 0 0 1-2.72 1.04 4.26 4.26 0 0 0-7.26 3.89A12.1 12.1 0 0 1 3.15 4.6a4.25 4.25 0 0 0 1.32 5.68 4.21 4.21 0 0 1-1.93-.53v.06a4.26 4.26 0 0 0 3.42 4.08 4.2 4.2 0 0 1-1.92.07 4.26 4.26 0 0 0 3.98 2.96A8.55 8.55 0 0 1 2 18.41a12.07 12.07 0 0 0 6.54 1.92c7.85 0 12.14-6.5 12.14-12.13 0-.18 0-.35-.01-.53A8.67 8.67 0 0 0 24 4.56a8.48 8.48 0 0 1-2.54.7Z"/>
      </svg>
    ),
    arrow: (
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="mr-2 h-4 w-4 text-white/50 transition-transform group-hover:translate-x-0.5 group-hover:text-indigo-300"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10.293 3.293a1 1 0 011.414 0l5 5a1 1 0 010 1.414l-5 5a1 1 0 11-1.414-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 010-1.414z"
          clipRule="evenodd"
        />
      </svg>
    ),
  };

  return (
    <footer className="relative mt-12">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-indigo-500/30 via-fuchsia-500/30 to-sky-500/30" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-5 py-12">
          {/* Brand + Mission */}
          <div>
            <img src={logo} alt="Dashrath Logo" className="h-10 w-auto rounded-lg bg-white ring-1 ring-white/20" />
            <p className="mt-2 text-white/70 max-w-sm">Building modern web apps, scalable APIs, and reliable deployments.</p>
            <div className="mt-4 flex items-center text-pink-200">
             
             
            </div>
            <div className="mt-2 flex items-center text-white/80">
             
              
            </div>
            {/* Social Links */}
            <div className="mt-5 flex gap-3" aria-label="Social links">
              <a href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10">{icons.github}</a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10">{icons.linkedin}</a>
              <a href="https://twitter.com/" target="_blank" rel="noreferrer" aria-label="Twitter" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 text-white/80 hover:bg-white/10">{icons.twitter}</a>
            </div>
          </div>
          {/* Explore */}
          <div>
            <div className="text-white font-semibold text-lg mb-1">Explore</div>
            <ul className="mt-3 space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} className="group flex items-center text-white/80 hover:text-indigo-400 font-medium transition-all">
                   {icons.arrow}
<span>{l.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Our Services */}
          <div>
            <div className="text-white font-semibold text-lg mb-1">Our Services</div>
            <ul className="mt-3 space-y-2">
              {servicesNav.map((s) => (
                <li key={s.to}>
                  <NavLink to={s.to} className="group flex items-center text-white/80 hover:text-indigo-400 font-medium transition-all">
                   {icons.arrow}
                    <span>{s.label}</span>
                   
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          {/* Resources */}
          <div>
            <div className="text-white font-semibold text-lg mb-1">Resources</div>
            <ul className="mt-3 space-y-2">
              {legal.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="group flex items-center text-white/80 hover:text-indigo-400 font-medium transition-all">
                  {icons.arrow}
                    <span>{l.label}</span>
                    
                    
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact + CTA + Logo */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              
              <div className="text-white font-semibold text-lg">Stay in touch</div>
            </div>
            <p className="text-white/70">For project inquiries or collaborations, drop a message.</p>
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 ring-1 ring-white/10">
              <div className="text-white/90 font-medium">Contact Us</div>
              <ul className="mt-2 space-y-2 text-white/80 text-sm">
                <li className="flex items-center">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-pink-600/20 text-pink-400" aria-hidden="true">
                    {/* Phone */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 .76l.6 2.4a1 1 0 0 1-.37 1.06l-1.82 1.37a13.05 13.05 0 0 0 6.16 6.16l1.37-1.82a1 1 0 0 1 1.06-.37l2.4.6a1 1 0 0 1 .76 1v4a1 1 0 0 1-1 1h-.5C9.6 20.5 3.5 14.4 3.5 6.5V6a1 1 0 0 1 1-1Z"/></svg>
                  </span>
                  <a href="tel:+917415090947" className="hover:text-white">+91 7415090947</a>
                </li>
                <li className="flex items-center">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600/20 text-indigo-400" aria-hidden="true">
                    {/* Mail */}
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35l-10 6.25L2 4.35V4Zm0 3.84V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7.84l-9.34 5.83a2 2 0 0 1-2.32 0L2 7.84Z"/></svg>
                  </span>
                  <a href="mailto:dashrathpro.dev@gmail.com" className="hover:text-white">dashrathpro.dev@gmail.com</a>
                </li>
              </ul>
            </div>
            <NavLink to="/contact" className="mt-4 inline-flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">Contact</NavLink>
            <button
              className="mt-4 ml-3 inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </button>
          </div>
        </div>
        {/* Bottom legal bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between border-t border-white/10 py-6 text-white/60 text-sm">
          <div>© {year} Dashrath. Built with React + Vite + Tailwind.</div>
          <div className="mt-2 sm:mt-0 flex gap-4">
            {legal.map((l) => (
              <a key={l.label} href={l.href} className="hover:text-white flex items-center">
                {l.label}
                {icons.arrow}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
