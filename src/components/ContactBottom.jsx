import { useState } from 'react';
import Reveal from './Reveal.jsx';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function ContactBottom() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [busy, setBusy] = useState(false);

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      alert('Please fill name, email and message.');
      return;
    }
    try {
      setBusy(true);
      await addDoc(collection(db, 'messages'), {
        name: form.name,
        phone: form.phone || '',
        email: form.email,
        message: form.message,
        createdAt: serverTimestamp(),
        source: 'home_bottom_contact',
      });
      alert('Thanks! We will contact you soon.');
      setForm({ name: '', phone: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact submit failed:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  const InfoCard = ({ icon, title, value }) => (
    <div className="flex flex-col items-center text-center">
      <div className="mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15 text-white/90">{icon}</div>
      <div className="text-white/70 text-xs uppercase tracking-wider">{title}</div>
      <div className="mt-1 text-white font-medium text-sm">{value}</div>
    </div>
  );

  const icons = {
    location: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>
    ),
    phone: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M2 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 .76l.6 2.4a1 1 0 0 1-.37 1.06l-1.82 1.37a13.05 13.05 0 0 0 6.16 6.16l1.37-1.82a1 1 0 0 1 1.06-.37l2.4.6a1 1 0 0 1 .76 1v4a1 1 0 0 1-1 1h-.5C9.6 20.5 3.5 14.4 3.5 6.5V6a1 1 0 0 1 1-1Z"/></svg>
    ),
    email: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M2 4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v.35l-10 6.25L2 4.35V4Zm0 3.84V20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7.84l-9.34 5.83a2 2 0 0 1-2.32 0L2 7.84Z"/></svg>
    ),
    whatsapp: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.83 14.92L2 22l5.2-1.36A10 10 0 1 0 12 2Zm5.27 14.31c-.22.62-1.28 1.2-1.77 1.22-.49.02-1.4.07-3.13-.65-2.67-1.11-4.38-3.81-4.51-3.99-.13-.18-1.08-1.44-1.04-2.75.04-1.31.69-1.94.93-2.2.24-.26.52-.32.69-.32.17 0 .34 0 .49.01.16.01.37-.06.58.44.22.53.75 1.84.81 1.97.06.13.09.28.02.45-.07.17-.12.27-.23.42-.11.15-.23.35-.33.46-.11.11-.22.23-.09.45.13.22.56 1 1.2 1.61.83.79 1.53 1.03 1.75 1.14.22.11.35.1.48-.06.13-.16.55-.64.7-.86.15-.22.3-.18.49-.11.19.07 1.2.57 1.4.67.2.1.34.16.39.25.05.09.05.52-.17 1.14Z"/></svg>
    ),
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      {/* heading */}
      <Reveal direction="up">
        <div className="text-center">
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Contact Me</div>
          <h2 className="mt-1 text-3xl md:text-4xl font-bold text-white">Contact</h2>
          <p className="mt-2 text-white/70">Expert full‑stack web solutions. Let’s connect for project inquiries or collaborations.</p>
        </div>
      </Reveal>

      {/* quick info row */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        <Reveal direction="up" delay={40}><InfoCard icon={icons.location} title="Address" value="Bengaluru, India" /></Reveal>
        <Reveal direction="up" delay={80}><InfoCard icon={icons.phone} title="Contact Number" value={<a href="tel:+917415090947" className="hover:text-white">+91 7415090947</a>} /></Reveal>
        <Reveal direction="up" delay={120}><InfoCard icon={icons.email} title="Email Address" value={<a href="mailto:dashrathpro.dev@gmail.com" className="hover:text-white">dashrathpro.dev@gmail.com</a>} /></Reveal>
        <Reveal direction="up" delay={160}><InfoCard icon={icons.whatsapp} title="WhatsApp" value={<a href="https://wa.me/917415090947" target="_blank" rel="noreferrer" className="hover:text-white">+91 7415090947</a>} /></Reveal>
      </div>

      {/* form + github preview */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        <Reveal direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <div className="text-white font-semibold">Get in Touch</div>
            <form onSubmit={submit} className="mt-4 space-y-3">
              <input type="text" name="name" placeholder="YourName" value={form.name} onChange={update} className="w-full rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <input type="tel" name="phone" placeholder="PhoneNumber" value={form.phone} onChange={update} className="w-full rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              <input type="email" name="email" placeholder="YourEmail" value={form.email} onChange={update} className="w-full rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <textarea name="message" placeholder="Message" rows="4" value={form.message} onChange={update} className="w-full rounded-md bg-white/10 px-3 py-2 text-sm text-white placeholder-white/50 ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <button type="submit" disabled={busy} className="inline-flex rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-60">{busy ? 'Submitting…' : 'SUBMIT'}</button>
            </form>
          </div>
        </Reveal>

        <Reveal direction="left" delay={140}>
          <div className="rounded-2xl border border-white/10 bg-[#0c0e18] p-6 ring-1 ring-white/10">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-white/10 ring-1 ring-white/15" aria-hidden="true" />
              <div>
                <div className="text-white font-semibold">GitHub Activity</div>
                <div className="text-white/60 text-sm">Open‑source contributions preview</div>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3">
              <img alt="GitHub Contributions" className="w-full rounded-md" src="https://ghchart.rshah.org/yourusername" />
              <div className="mt-3 flex items-center gap-3 text-sm">
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/15 hover:bg-white/15">View Profile</a>
                <a href="https://github.com/yourusername?tab=repositories" target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-white/10 px-3 py-1 text-white ring-1 ring-white/15 hover:bg-white/15">Repos</a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}