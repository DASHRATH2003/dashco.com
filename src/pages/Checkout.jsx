import { useEffect, useState } from 'react';
import { useSearchParams, NavLink } from 'react-router-dom';
import Reveal from '../components/Reveal.jsx';
import { startPayment, loadRazorpay } from '../utils/razorpay.js';

const MIN_PRICE = 2000;
const MAX_PRICE = 10000;

export default function Checkout() {
  const [params] = useSearchParams();
  const title = params.get('title') || 'Website Template';
  const initial = Math.min(MAX_PRICE, Math.max(MIN_PRICE, Number(params.get('amount')) || MIN_PRICE));
  const [amount, setAmount] = useState(initial);
  const [busy, setBusy] = useState(false);

  useEffect(() => { loadRazorpay().catch(() => {}); }, []);

  async function pay() {
    try {
      setBusy(true);
      const response = await startPayment({
        amountRupees: amount,
        name: title,
        description: `Checkout — ₹${amount}`,
        notes: { project: title },
      });
      // Persist order for admin analytics
      const { saveOrderToFirestore } = await import('../utils/orders.js');
      await saveOrderToFirestore({
        amountRupees: amount,
        currency: 'INR',
        project: title,
        paymentId: response?.razorpay_payment_id,
        orderId: response?.razorpay_order_id,
        meta: { page: 'checkout' },
        source: 'checkout',
      });
      alert('Payment successful! We will contact you shortly.');
    } catch (e) {
      alert(e?.message || 'Payment cancelled or failed');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Checkout</div>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">{title}</h1>
            <p className="mt-3 text-white/70">Choose amount between ₹{MIN_PRICE} and ₹{MAX_PRICE} and proceed to pay.</p>
          </div>
          <NavLink to="/projects" className="hidden md:inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">Back to Projects</NavLink>
        </div>
      </Reveal>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
        <div className="text-white text-lg">Amount: <span className="font-semibold">₹{amount}</span></div>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={500}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="mt-4 w-full"
        />
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={pay}
            disabled={busy}
            className="inline-flex rounded-full bg-pink-600 px-5 py-2 text-sm font-medium text-white hover:bg-pink-700 disabled:opacity-60"
          >
            {busy ? 'Processing…' : 'Pay Now'}
          </button>
          <NavLink to="/contact" className="inline-flex rounded-full bg-white/10 px-5 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15">Contact</NavLink>
        </div>
        <div className="mt-4 text-xs text-white/50">Test mode: use Razorpay test cards/UPI. After payment, server verifies the signature.</div>
      </div>
    </main>
  );
}