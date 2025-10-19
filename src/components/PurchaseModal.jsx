import { useEffect, useState } from 'react';

export default function PurchaseModal({ open, onClose, title, price, imageSrc, link, onPayNow }) {
  if (!open) return null;

  const [show, setShow] = useState(false);

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
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose && onClose(), 220);
  };

  const formatINR = (n) => new Intl.NumberFormat('en-IN').format(Number(n || 0));

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true">
      {/* Dim/blur the entire page */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-[2px] transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal card */}
      <div className="relative mx-auto w-full max-w-3xl p-4">
        <div
          className={`overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-md ring-1 ring-white/10 shadow-2xl transition-all duration-300 ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-1'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: preview image with subtle dark overlay */}
            <div className="relative bg-white/5">
              {imageSrc ? (
                <img src={imageSrc} alt={title} className="h-full w-full object-cover brightness-90" />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-white/60 p-8">No preview available</div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <a
                href={link || '#'}
                target="_blank"
                rel="noreferrer"
                className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-black/40 px-3 py-1 text-xs text-white ring-1 ring-white/15 hover:bg-black/60"
              >
                Open Demo ↗
              </a>
            </div>

            {/* Right: details */}
            <div className="p-6">
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-white leading-snug">{title}</h3>
                <button
                  onClick={handleClose}
                  className="rounded-full bg-white/10 px-3 py-1 text-xs text-white ring-1 ring-white/15 hover:bg-white/15"
                >
                  Close
                </button>
              </div>

              <div className="mt-2">
                <span className="inline-flex items-center rounded-full bg-gradient-to-r from-pink-500/20 to-indigo-500/20 px-3 py-1 text-sm text-pink-200 ring-1 ring-white/10">
                  Price: ₹{formatINR(price)}
                </span>
              </div>

              <div className="mt-4 text-white/80 text-sm leading-relaxed">
                <p>
                  Responsive, SEO‑friendly, fast templates with modern UI. Includes basic customization, contact form integration, and deployment help.
                </p>
                <ul className="mt-3 space-y-1">
                  {['Mobile‑friendly layouts','Optimized images and assets','Contact/Enquiry section','Basic branding tweaks (colors, logo, text)'].map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-pink-400" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={onPayNow}
                  className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-600 via-fuchsia-600 to-indigo-600 px-6 py-2 text-sm font-medium text-white shadow-lg shadow-pink-500/20 ring-1 ring-white/10 hover:from-pink-500 hover:to-indigo-500"
                >
                  Pay Now
                </button>
                <button
                  onClick={handleClose}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-6 py-2 text-sm font-medium text-white ring-1 ring-white/15 hover:bg-white/15"
                >
                  Not Now
                </button>
              </div>

              <div className="mt-4 text-[11px] text-white/55">
                Pay Now will open Razorpay checkout directly (test mode for development).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}