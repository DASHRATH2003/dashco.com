import Reveal from '../components/Reveal.jsx'

export default function TermsOfService() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div>
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Legal</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Terms & Conditions</h1>
          <p className="mt-3 text-white/70 max-w-3xl">By using this website or purchasing any digital product (project source code/templates), you agree to the following terms. Please read them carefully.</p>
        </div>
      </Reveal>

      <section className="mt-10 space-y-10">
        <Reveal direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Products and License</h2>
            <ul className="mt-3 list-disc pl-6 text-white/80 space-y-1">
              <li>Products are delivered digitally (code/templates/assets). No physical shipment.</li>
              <li>Unless otherwise stated, you receive a non-exclusive license to use the code for your own or your clients’ projects.</li>
              <li>Resale, re-distribution, or claiming the product as your own is not permitted.</li>
              <li>Attribution is appreciated but not mandatory unless specified in product notes.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Payments</h2>
            <p className="mt-3 text-white/80">Payments are processed securely via Razorpay. We do not store your full card/UPI details. Taxes, if applicable, are shown during checkout or on invoice.</p>
            <p className="mt-3 text-white/70 text-sm">Razorpay policies: <a href="https://razorpay.com/terms/" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-pink-200">Terms</a> · <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-pink-200">Privacy</a></p>
          </div>
        </Reveal>

        <Reveal delay={160} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Delivery and Support</h2>
            <ul className="mt-3 list-disc pl-6 text-white/80 space-y-1">
              <li>Access is provided instantly after successful payment (or within a reasonable time if manual verification is needed).</li>
              <li>Basic support is provided via email for setup issues related to the purchased product.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={200} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Refunds & Cancellations</h2>
            <p className="mt-3 text-white/80">Please refer to our <a href="/refund-policy" className="text-pink-300 hover:text-pink-200">Refund Policy</a> for eligibility, timelines, and process. Digital goods are generally non‑refundable once delivered, except in the cases outlined there.</p>
          </div>
        </Reveal>

        <Reveal delay={240} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Acceptable Use</h2>
            <ul className="mt-3 list-disc pl-6 text-white/80 space-y-1">
              <li>Do not use our products for unlawful activities or to violate third‑party rights.</li>
              <li>Do not attempt to attack, disrupt, or misuse the website or payment gateway.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={280} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Limitation of Liability</h2>
            <p className="mt-3 text-white/80">Products are provided “as is”. We are not liable for any indirect, incidental, or consequential damages arising from the use of the products or this site.</p>
          </div>
        </Reveal>

        <Reveal delay={320} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Governing Law</h2>
            <p className="mt-3 text-white/80">These terms are governed by the laws of India. Disputes, if any, will be subject to the jurisdiction of courts in India.</p>
          </div>
        </Reveal>

        <Reveal delay={360} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3 text-white/80">For any questions regarding these terms, email <a href="mailto:dashrathpro.dev@gmail.com" className="text-pink-300 hover:text-pink-200">dashrathpro.dev@gmail.com</a> or call <a href="tel:+917415090947" className="text-pink-300 hover:text-pink-200">+91 7415090947</a>.</p>
            <p className="mt-3 text-white/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}