import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', answer: '' });
  const [busy, setBusy] = useState(false);
  const question = '8 + 5';
  const correct = 13;

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async (e) => {
    e.preventDefault();
    if (parseInt(form.answer, 10) !== correct) {
      alert('Please solve the captcha correctly.');
      return;
    }
    // basic validation
    if (!form.name || !form.email) {
      alert('Name and email are required.');
      return;
    }
    try {
      setBusy(true);
      await addDoc(collection(db, 'messages'), {
        name: form.name,
        email: form.email,
        phone: form.phone || '',
        service: form.service || '',
        createdAt: serverTimestamp(),
        source: 'contact_page',
      });
      alert('Thanks! We will contact you soon.');
      setForm({ name: '', email: '', phone: '', service: '', answer: '' });
    } catch (err) {
      console.error('Failed to save message:', err);
      alert('Failed to submit. Please try again.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white shadow-xl ring-1 ring-gray-200 p-6 sm:p-8">
      <h3 className="text-xl font-semibold text-gray-900">Fill out the form, and we'll contact you</h3>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="First Name"
          value={form.name}
          onChange={update}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={update}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={update}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <select
          name="service"
          value={form.service}
          onChange={update}
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Service</option>
          <option>Website Design</option>
          <option>UI/UX</option>
          <option>Shopify</option>
          <option>SEO</option>
          <option>Consulting</option>
        </select>
        <div>
          <label className="block text-sm text-gray-700 mb-1">What is {question}?</label>
          <input
            type="text"
            name="answer"
            placeholder="Type your answer"
            value={form.answer}
            onChange={update}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button type="submit" disabled={busy} className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {busy ? 'Submitting…' : 'SUBMIT'}
        </button>
      </form>
    </div>
  );
}