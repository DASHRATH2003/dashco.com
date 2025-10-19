import { NavLink } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import profileImage from '../assets/profile.jpg';

export default function ProfileIntro() {
  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Express',
    'MongoDB',
    'PostgreSQL',
    'Tailwind CSS',
    'Redux',
    'Docker',
    'AWS',
    'Git',
  ];

  return (
    <div className="relative">
      {/* Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white/5 p-6 sm:p-8 ring-1 ring-white/10">
        {/* Header with animated avatar ring */}
        <div className="flex items-center gap-4">
             <Avatar src={profileImage} alt="Dashrath" initials="DS" />

          <div>
            <h3 className="text-2xl font-bold text-white">Dashrath — Full‑Stack Developer</h3>
            <p className="mt-1 text-sm text-gray-300">I build fast, scalable apps: React, Node.js, APIs, DBs & DevOps.</p>
          </div>
        </div>

        {/* Skills */}
        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200">
              {s}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6 flex gap-3">
          <NavLink to="/projects" className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">View Projects</NavLink>
          <NavLink to="/contact" className="rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20">Hire Me</NavLink>
        </div>

        {/* Big animated orb in background */}
        <div className="pointer-events-none absolute -top-24 -right-36 h-80 w-80 rounded-full opacity-50 blur-2xl bg-[conic-gradient(#8b5cf6,#ec4899,#22d3ee,#8b5cf6)] animate-[spin_14s_linear_infinite]" />
      </div>
    </div>
  );
}