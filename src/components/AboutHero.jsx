import Reveal from "./Reveal";
import profile from "../assets/profile.jpg";
export default function AboutHero() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <Reveal direction="up">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">
              About Me
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">
              I craft high‑impact digital experiences
            </h1>
            <p className="mt-3 text-white/70 max-w-xl">
              Design se lekar development tak — responsive websites, blazing
              fast performance, aur delightful animations. Har project me
              problem‑solving aur clean architecture par strong focus.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="#skills"
                className="inline-flex rounded-full bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Skills
              </a>
              <a
                href="#journey"
                className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15"
              >
                Journey
              </a>
            </div>
          </div>
          <Reveal delay={140} direction="left">
            <div className="relative">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-sky-500/20 blur-lg" />
              <img
                src={profile}
                alt="Profile"
                className="relative rounded-3xl border border-white/10 ring-1 ring-white/10 w-ful h-full object-contain bg-white/5"
              />
            </div>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}
