import { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Reveal from './Reveal';
import { projectLinks } from '../data/projectLinks.js';

import PurchaseModal from './PurchaseModal.jsx';
import ClientDetailsModal from './ClientDetailsModal.jsx';
import { startPayment, loadRazorpay } from '../utils/razorpay.js';
const PRICE_START = 2000;
const PRICE_END = 10000;

const DEFAULT_PRICE_INR = 4999; // change as needed

function humanize(name) {
  return name.replace(/[-_]/g, ' ').replace(/project(\d+)/i, 'Project $1').replace(/\b\w/g, c => c.toUpperCase());
}

export default function ProjectsCarousel() {
  const items = useMemo(() => {
    const modules = import.meta.glob('../assets/project*.{png,jpg,jpeg,webp}', { eager: true });
    const list = Object.entries(modules).map(([path, mod]) => {
      const src = mod.default || path;
      const file = path.split('/').pop();
      const base = file.replace(/\.[^.]+$/, '');
      return {
        src,
        title: humanize(base),
        link: projectLinks[base] || '/projects',
      };
    });
    // sort by filename order
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }, []);

  const itemsWithPrice = useMemo(() => {
    const n = items.length || 1;
    const step = n > 1 ? Math.floor((PRICE_END - PRICE_START) / (n - 1)) : 0;
    return items.map((it, idx) => ({ ...it, price: PRICE_START + idx * step }));
  }, [items]);
  const doubled = useMemo(() => [...itemsWithPrice, ...itemsWithPrice], [itemsWithPrice]);
  const [fast, setFast] = useState(true); // running by default
  // removed useNavigate
  const [purchase, setPurchase] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);

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
        description: `Website template purchase — ₹${purchase.price}`,
        notes: { project: purchase.title },
      });
      const { saveOrderToFirestore } = await import('../utils/orders.js');
      const baseOrder = {
        amountRupees: purchase.price,
        currency: 'INR',
        project: purchase.title,
        paymentId: response?.razorpay_payment_id,
        orderId: response?.razorpay_order_id,
        meta: { page: 'projects_carousel', link: purchase.link },
        source: 'carousel',
      };
      await saveOrderToFirestore(baseOrder);
      // Open post-purchase details popup at top of screen
      setPurchase(null);
      setOrderDetails(baseOrder);
    } catch (e) {
      alert(e?.message || 'Payment cancelled or failed');
    }
  };
  

  return (
    <div className="relative">
      <Reveal direction="up">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-pink-400/80">Portfolio</div>
            <h3 className="text-2xl font-semibold text-white">Projects</h3>
            <p className="text-white/60">Auto‑scroll carousel — images load automatically from assets.</p>
          </div>
          <NavLink to="/projects" className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-pink-700">View All</NavLink>
        </div>
      </Reveal>

      <div
        className="mt-6 overflow-x-auto no-scrollbar"
        onMouseEnter={() => setFast(true)}
        onMouseLeave={() => setFast(false)}
        onWheel={(e) => { e.preventDefault(); e.currentTarget.scrollLeft += e.deltaY; setFast(false); }}
      >
        <div
          className={`flex gap-6 whitespace-nowrap will-change-transform ${fast ? 'animate-marquee-fast' : 'animate-marquee-slow'}`}
          style={{ animationPlayState: fast ? 'running' : 'paused' }}
        >
          {doubled.map((p, i) => (
            <div
              key={i + p.title}
              className="group inline-block w-[320px] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 ring-1 ring-white/10"
            >
              <NavLink to={p.link} className="block">
                <div className="relative aspect-video">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/15 to-sky-500/20" />
                  <img src={p.src} alt={p.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </NavLink>
              <div className="p-4">
                <div className="text-white font-semibold">{p.title}</div>
                <div className="mt-2 flex items-center gap-2">
                  <a href={p.link} className="text-pink-300 text-xs hover:text-pink-200">Open →</a>
                  <span className="text-white/70 text-xs">₹{p.price}</span>
                  <button
                    type="button"
                    onClick={() => openBuy(p)}
                    className="rounded-full bg-pink-600 px-4 py-2 text-white hover:bg-pink-700"
                  >
                    Buy Now
                  </button>
                  <NavLink
                    to="/contact"
                    className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white ring-1 ring-white/15 hover:bg-white/15"
                  >
                    Contact
                  </NavLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 text-white/50 text-xs">Hover se turant fast scrolling hota hai. Mouse wheel se horizontally scroll bhi kar sakte hain.</div>
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
      {orderDetails && (
        <ClientDetailsModal
          open={!!orderDetails}
          onClose={() => setOrderDetails(null)}
          order={orderDetails}
          onSaved={() => setOrderDetails(null)}
        />
      )}
    </div>
  );
}