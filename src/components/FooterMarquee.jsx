import { useMemo, useRef, useState } from 'react';
import { mobileLinks } from '../data/mobileLinks.js';

import PurchaseModal from './PurchaseModal.jsx';
import { startPayment, loadRazorpay } from '../utils/razorpay.js';
const PRICE_START = 2000;
const PRICE_END = 10000;

const DEFAULT_PRICE_INR = 2999; // change as needed for mobile templates

function sortMobileNames(keys) {
  return keys.sort((a, b) => {
    const na = Number(a.match(/mobile(\d+)/)?.[1] || 0);
    const nb = Number(b.match(/mobile(\d+)/)?.[1] || 0);
    return na - nb;
  });
}

export default function FooterMarquee() {
  const trackRef = useRef(null);
  const [fast, setFast] = useState(true); // running by default
  // removed useNavigate
  const [purchase, setPurchase] = useState(null);

  const openBuy = (item) => {
    setFast(false);
    setPurchase(item);
    loadRazorpay().catch(() => {});
  };
  const closeBuy = () => setPurchase(null);
  const goPayNow = async () => {
    if (!purchase) return;
    try {
      const response = await startPayment({
        amountRupees: purchase.price,
        name: purchase.title,
        description: `Mobile website purchase — ₹${purchase.price}`,
        notes: { project: purchase.title },
      });
      const { saveOrderToFirestore } = await import('../utils/orders.js');
      await saveOrderToFirestore({
        amountRupees: purchase.price,
        currency: 'INR',
        project: purchase.title,
        paymentId: response?.razorpay_payment_id,
        orderId: response?.razorpay_order_id,
        meta: { page: 'footer_marquee', link: purchase.link },
        source: 'marquee',
      });
      alert('Payment successful! We will contact you shortly.');
      setPurchase(null);
    } catch (e) {
      alert(e?.message || 'Payment cancelled or failed');
    }
  };
  const items = useMemo(() => {
    const modules = import.meta.glob('../assets/mobile*.{png,jpg,jpeg,webp}', { eager: true });
    const ordered = sortMobileNames(Object.keys(modules));
    return ordered.map((path) => {
      const mod = modules[path];
      const src = mod.default || path;
      const file = path.split('/').pop();
      const base = file.replace(/\.[^.]+$/, '');
      const title = base.replace(/mobile(\d+)/i, 'Mobile $1');
      return {
        src,
        title,
        link: mobileLinks[base] || '#',
      };
    });
  }, []);

  const itemsWithPrice = useMemo(() => {
    const n = items.length || 1;
    const step = n > 1 ? Math.floor((PRICE_END - PRICE_START) / (n - 1)) : 0;
    return items.map((it, idx) => ({ ...it, price: PRICE_START + idx * step }));
  }, [items]);

  const doubled = useMemo(() => [...itemsWithPrice, ...itemsWithPrice], [itemsWithPrice]);


  return (
    <div className="relative mt-12">
      <div className="rounded-xl border border-white/10 bg-white/5 p-3 ring-1 ring-white/10">
        <div
          className="overflow-x-auto no-scrollbar"
          onMouseEnter={() => setFast(false)}
          onMouseLeave={() => setFast(true)}
          onWheel={(e) => { e.preventDefault(); e.currentTarget.scrollLeft += e.deltaY; setFast(false); }}
        >
          <div
            ref={trackRef}
            className={`flex gap-4 whitespace-nowrap will-change-transform ${fast ? 'animate-marquee-fast' : 'animate-marquee-slow'}`}
            style={{ animationPlayState: fast ? 'running' : 'paused' }}
          >
            {doubled.map((p, i) => (
              <div
                key={i + p.title}
                className="inline-block w-[240px] md:w-[260px] shrink-0 overflow-visible rounded-xl border border-white/10 bg-white/5 p-2 ring-1 ring-white/10"
              >
                <div className="relative aspect-[9/16]">
                  <img src={p.src} alt={p.title} className="h-full w-full object-contain" />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <a href={p.link} target="_blank" rel="noreferrer" className="text-pink-300 text-xs hover:text-pink-200">Open →</a>
                  <div className="flex gap-2 items-center">
                    <span className="text-white/70 text-[11px]">₹{p.price}</span>
                    <button
                      onClick={() => openBuy(p)}
                      className="rounded-full bg-pink-600 px-3 py-1 text-xs font-medium text-white hover:bg-pink-700"
                    >
                      Buy Now
                    </button>
                    <a href="/contact" className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15 hover:bg-white/15">Contact</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-2 text-center text-xs text-white/60">Hover karne par marquee pause ho jata hai — mouse wheel se horizontally scroll kar sakte hain.</div>
    {purchase && (
        <PurchaseModal
          open={!!purchase}
          onClose={closeBuy}
          title={purchase.title}
          price={purchase.price}
          imageSrc={purchase.src}
          link={purchase.link}
          onPayNow={goPayNow}
        />
      )}
    </div>
  );
}