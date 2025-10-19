import { useEffect, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

/**
 * Popup shown after successful payment to collect client details.
 * Appears at top of the screen (items-start) as requested.
 */
export default function ClientDetailsModal({ open, onClose, order = {}, onSaved }) {
  if (!open) return null;

  const [show, setShow] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    websiteType: 'Business',
    location: '',
    requirements: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setShow(true);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    if (saving) return; // prevent closing while saving
    setShow(false);
    setTimeout(() => onClose && onClose(), 220);
  };

  const update = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email) {
      setError('Please enter your name and email.');
      return;
    }
    try {
      setSaving(true);
      const payload = {
        ...form,
        orderId: order?.orderId || '',
        paymentId: order?.paymentId || '',
        project: order?.project || '',
        amountRupees: Number(order?.amountRupees || 0),
        source: 'post_purchase_popup',
        createdAt: serverTimestamp(),
      };
      await addDoc(collection(db, 'order_details'), payload);
      setSaving(false);
      setShow(false);
      if (onSaved) onSaved(payload);
      setTimeout(() => onClose && onClose(), 200);
      alert('Thank you! Your details were saved.');
    } catch (err) {
      console.error(err);
      setSaving(false);
      setError(err?.message || 'Failed to save details. Please try again.');
    }
  };

  const formatINR = (n) => new Intl.NumberFormat('en-IN').format(Number(n || 0));

  return (
    <div className="fixed inset-0 z-[110] flex items-start justify-center pt-6" role="dialog" aria-modal="true">
      {/* Overlay backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Card anchored near top */}
      <div className="relative mx-auto w-full max-w-2xl p-4">
        <div className={`overflow-hidden rounded-2xl border border-white/15 bg-white/[0.05] ring-1 ring-white/10 shadow-2xl transition-all duration-300 ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-1'}`}>
          <div className="bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/20 to-pink-500/20 p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs uppercase tracking-widest text-pink-300/90">Order Details</div>
                <h3 className="text-xl font-semibold text-white">Provide your requirements</h3>
                <p className="text-white/70 text-sm">Project: <span className="text-white">{order?.project || 'N/A'}</span> • Price: ₹{formatINR(order?.amountRupees)}</p>
              </div>
              <button
                onClick={handleClose}
                className="rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 hover:bg-white/15"
              >Close</button>
            </div>
          </div>

          <form onSubmit={submit} className="p-6 grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your full name"
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-white/80 text-sm">Gmail / Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@gmail.com"
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm">Website Type</label>
                <select
                  name="websiteType"
                  value={form.websiteType}
                  onChange={update}
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white focus:border-pink-400 focus:outline-none"
                >
                  {['Business','Portfolio','E‑commerce','Blog','Landing Page','Educational'].map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-white/80 text-sm">Location (City / Country)</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={update}
                  placeholder="e.g., Mumbai, India"
                  className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-white/80 text-sm">What do you need? (Requirements)</label>
              <textarea
                name="requirements"
                value={form.requirements}
                onChange={update}
                rows={4}
                placeholder="Describe pages, features, colors, content, etc."
                className="mt-1 w-full rounded-lg border border-white/15 bg-black/30 px-3 py-2 text-white placeholder-white/40 focus:border-pink-400 focus:outline-none"
              />
            </div>

            {error && <div className="text-pink-300 text-sm">{error}</div>}

            <div className="flex items-center gap-3 p-2">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-600 via-fuchsia-600 to-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-pink-500/20 ring-1 ring-white/10 hover:from-pink-500 hover:to-indigo-500 disabled:opacity-60"
              >{saving ? 'Saving…' : 'Save Details'}</button>
              <button
                type="button"
                onClick={handleClose}
                disabled={saving}
                className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15 disabled:opacity-60"
              >Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}