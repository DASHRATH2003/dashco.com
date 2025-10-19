import Reveal from '../components/Reveal.jsx'
import ContactForm from '../components/ContactForm.jsx'

export default function Contact() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div>
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Get in touch</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Contact Us</h1>
          <p className="mt-3 text-white/70 max-w-2xl">Collaboration, consulting ya custom build — sab ke liye connect karein. Requirements discuss karte hain, timeline/estimate batate hain, aur best approach suggest karte hain.</p>
        </div>
      </Reveal>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <Reveal direction="up">
          <ContactForm />
        </Reveal>

        <Reveal delay={140} direction="left">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-white font-semibold text-lg">Contact details</div>
            <ul className="mt-4 space-y-3 text-white/80 text-sm">
              <li><span className="text-white/70">Email:</span> <a href="mailto:contact@example.com" className="text-pink-300 hover:text-pink-200">contact@example.com</a></li>
              <li><span className="text-white/70">Phone:</span> <a href="tel:+910000000000" className="text-pink-300 hover:text-pink-200">+91 00000 00000</a></li>
              <li><span className="text-white/70">Location:</span> Remote / India</li>
              <li><span className="text-white/70">Hours:</span> Mon–Fri, 10am–6pm IST</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href="mailto:contact@example.com" className="inline-flex rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700">Email</a>
              <a href="tel:+910000000000" className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">Call</a>
            </div>
          </div>
        </Reveal>
      </div>
    </main>
  )
}