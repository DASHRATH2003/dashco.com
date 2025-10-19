import { NavLink } from 'react-router-dom';
import ProfileIntro from './ProfileIntro.jsx';

export default function Hero() {
  const featuresLeft = [
    'Front‑end: React, Next.js, Tailwind CSS',
    'Back‑end: Node.js, Express',
    'Databases: MongoDB, PostgreSQL',
  ];
  const featuresRight = [
    'APIs & third‑party integrations',
    'Performance & SEO best practices',
    'Deployment: Docker, AWS',
  ];

  return (
    <section className="relative">
      {/* Dark gray gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0f1020] to-[#1a1b2f]" aria-hidden="true" />
      {/* Decorative blur blobs */}
      <div className="absolute -top-20 -left-10 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden="true" />
      <div className="absolute top-40 -right-10 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left content */}
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
              Hi, I'm Dashrath
              <br />
              I build modern web apps & Website
            </h1>
            <p className="mt-6 text-gray-300 max-w-2xl">
              Full‑stack developer focused on high‑quality UI, scalable backends,
              and reliable deployments. I help ship performant, production‑ready products.
            </p>

            {/* Feature lists */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              <ul className="space-y-3">
                {featuresLeft.map((item) => (
                  <li key={item} className="flex items-center text-gray-200">
                    <span className="mr-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M16.704 5.292a1 1 0 0 1 .004 1.414l-7.25 7.292a1 1 0 0 1-1.445-.02L3.3 10.54a1 1 0 1 1 1.398-1.43l3.002 2.933l6.55-6.585a1 1 0 0 1 1.454-.166Z"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {featuresRight.map((item) => (
                  <li key={item} className="flex items-center text-gray-200">
                    <span className="mr-3 inline-flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20 text-green-400">
                      <svg className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path d="M16.704 5.292a1 1 0 0 1 .004 1.414l-7.25 7.292a1 1 0 0 1-1.445-.02L3.3 10.54a1 1 0 1 1 1.398-1.43l3.002 2.933l6.55-6.585a1 1 0 0 1 1.454-.166Z"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <NavLink
                to="/projects"
                className="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-pink-700"
              >
                VIEW PROJECTS
              </NavLink>
              <div className="flex items-center text-pink-200">
                <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-pink-600/20 text-pink-400">
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 .76l.6 2.4a1 1 0 0 1-.37 1.06l-1.82 1.37a13.05 13.05 0 0 0 6.16 6.16l1.37-1.82a1 1 0 0 1 1.06-.37l2.4.6a1 1 0 0 1 .76 1v4a1 1 0 0 1-1 1h-.5C9.6 20.5 3.5 14.4 3.5 6.5V6a1 1 0 0 1 1-1H4Z"/></svg>
                </span>
                Call Now: +91 7415090947
              </div>
            </div>
          </div>

          {/* Right intro card */}
          <div>
            <ProfileIntro />
          </div>
        </div>
      </div>
    </section>
  );
}