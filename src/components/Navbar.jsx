import { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { servicesNav } from '../data/services.js';

// Import your logo image here
import logo from '../assets/logo.png';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(typeof window !== 'undefined' ? window.scrollY : 0);

  useEffect(() => {
    const onScroll = () => {
      const y = typeof window !== 'undefined' ? window.scrollY : 0;
      const goingDown = y > lastY.current;
      // Keep navbar visible when mobile menu is open
      if (open) {
        setHidden(false);
        lastY.current = y;
        return;
      }
      // Near top, always show
      if (y <= 8) {
        setHidden(false);
      } else if (goingDown) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [open]);

  const centerItems = navItems.filter((i) => i.label !== 'Contact');

  return (
    <nav className={`sticky top-0 z-50 relative border-b border-white/10 bg-[#0c0f1a]/80 backdrop-blur transition-transform duration-300 shadow-sm ${hidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-indigo-600 via-blue-600 to-fuchsia-600" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center">
          {/* Left: Logo */}
          <div className="flex flex-1 items-center">
            <NavLink to="/">
              <img src={logo} alt="Logo" className="h-24 w-30" />
            </NavLink>
          </div>

          {/* Center: nav items excluding Contact */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-2">
            {centerItems.map((item) =>
              item.label !== 'Services' ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10 ring-1 ring-white/10' : 'text-gray-200 hover:text-white hover:bg-white/10'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </NavLink>
              ) : (
                <div key={item.to} className="relative group">
                  <NavLink
                    to={item.to}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors ${isActive ? 'text-white bg-white/10 ring-1 ring-white/10' : 'text-gray-200 hover:text-white hover:bg-white/10'}`
                    }
                  >
                    Services
                  </NavLink>
                  <div className="invisible absolute left-1/2 -translate-x-1/2 mt-2 w-64 rounded-xl border border-white/10 bg-gray-900/90 p-2 shadow-xl ring-1 ring-white/10 backdrop-blur-sm group-hover:visible group-focus-within:visible">
                    <div className="grid grid-cols-1 gap-1">
                      {servicesNav.map((s) => (
                        <NavLink
                          key={s.to}
                          to={s.to}
                          className={({ isActive }) =>
                            `block rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-white/10 text-white' : 'text-gray-200 hover:bg-white/10 hover:text-white'}`
                          }
                        >
                          {s.label}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* Right: Contact link + mobile toggle */}
          <div className="flex flex-1 items-center justify-end">
            <div className="hidden md:block">
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full text-sm font-semibold ${isActive ? 'bg-indigo-600 text-white shadow' : 'bg-indigo-600/90 text-white hover:bg-indigo-700 shadow'}`
                }
              >
                Contact Us
              </NavLink>
            </div>

            <div className="flex items-center md:hidden">
              <button
                aria-label="Toggle Menu"
                onClick={() => setOpen(!open)}
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-white/10 focus:outline-none"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-gray-900/80 backdrop-blur">
          <div className="space-y-1 px-2 py-3">
            {navItems.map((item) =>
              item.label !== 'Services' ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-white bg-white/10' : 'text-gray-200 hover:text-white hover:bg-white/10'}`
                  }
                  onClick={() => setOpen(false)}
                >
                  {item.to === '/contact' ? 'Contact Us' : item.label}
                </NavLink>
              ) : (
                <div key={item.to} className="space-y-1">
                  <div className="px-3 py-2 text-base font-medium text-gray-200">Services</div>
                  <div className="space-y-1">
                    {servicesNav.map((s) => (
                      <NavLink
                        key={s.to}
                        to={s.to}
                        className={({ isActive }) =>
                          `block px-3 py-2 rounded-md text-sm ${isActive ? 'text-white bg-white/10' : 'text-gray-200 hover:text-white hover:bg-white/10'}`
                        }
                        onClick={() => setOpen(false)}
                      >
                        {s.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
