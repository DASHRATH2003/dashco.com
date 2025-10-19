import Reveal from '../components/Reveal.jsx'

export default function RefundPolicy() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div>
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Legal</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Refund Policy</h1>
          <p className="mt-3 text-white/70 max-w-3xl">
            This Refund Policy outlines the conditions under which refunds may be granted for digital services and products purchased through this website. 
            We provide website development, design, and related digital assets as part of our freelance services.
          </p>
        </div>
      </Reveal>

      <section className="mt-10 space-y-10">
        <Reveal direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">General Rule</h2>
            <p className="mt-3 text-white/80">
              Since we deal in digital products and services (such as source code, templates, or project setups),
              all sales are considered final once delivered. However, we do provide refunds in genuine cases as mentioned below.
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Eligible Refund Scenarios</h2>
            <ul className="mt-3 list-disc pl-6 text-white/80 space-y-1">
              <li>Duplicate payment made for the same service/order.</li>
              <li>Payment successful but service or product not delivered within 48 hours.</li>
              <li>Severe technical issue that prevents use, and cannot be fixed within 7 days of reporting.</li>
            </ul>
            <p className="mt-3 text-white/70 text-sm">
              Note: Refunds are <b>not applicable</b> for reasons like “changed my mind”, “accidental purchase”,
              or incompatibility due to a user’s local setup/environment after delivery.
            </p>
          </div>
        </Reveal>

        <Reveal delay={160} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">How to Request a Refund</h2>
            <ol className="mt-3 list-decimal pl-6 text-white/80 space-y-1">
              <li>
                Email us at <a href="mailto:dashrathpro.dev@gmail.com" className="text-pink-300 hover:text-pink-200">dashrathpro.dev@gmail.com</a> 
                with your order ID, payment reference, and issue details.
              </li>
              <li>Attach relevant screenshots or error logs (if applicable).</li>
              <li>We usually respond within 1–2 business days.</li>
            </ol>
          </div>
        </Reveal>

        <Reveal delay={200} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Processing Time</h2>
            <p className="mt-3 text-white/80">
              Approved refunds will be processed to the original payment method via Razorpay within 5–7 business days 
              (timing may vary based on your bank or card issuer).
            </p>
          </div>
        </Reveal>

        <Reveal delay={240} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Chargebacks</h2>
            <p className="mt-3 text-white/80">
              If you are considering a chargeback, please contact us first. 
              We are always willing to help resolve any issues quickly and fairly.
            </p>
          </div>
        </Reveal>

        <Reveal delay={280} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3 text-white/80">
              Email: <a href="mailto:dashrathpro.dev@gmail.com" className="text-pink-300 hover:text-pink-200">dashrathpro.dev@gmail.com</a><br />
              Phone: <a href="tel:+917415090947" className="text-pink-300 hover:text-pink-200">+91 7415090947</a>
            </p>
            <p className="mt-3 text-white/50 text-sm">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
