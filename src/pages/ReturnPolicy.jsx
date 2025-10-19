import Reveal from '../components/Reveal.jsx'

export default function ReturnPolicy() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div>
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Legal</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Return Policy</h1>
          <p className="mt-3 text-white/70 max-w-3xl">Our products are digital (project source code and templates) and delivered electronically. Physical returns are not applicable.</p>
        </div>
      </Reveal>

      <section className="mt-10 space-y-10">
        <Reveal direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">No Physical Returns</h2>
            <p className="mt-3 text-white/80">Because access to code is delivered instantly and cannot be “returned”, we do not accept returns of digital content.</p>
          </div>
        </Reveal>

        <Reveal delay={140} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Issues or Incorrect Delivery</h2>
            <p className="mt-3 text-white/80">If you did not receive access, received the wrong item, or are facing a critical technical problem, please reach out. Where applicable, our <a href="/refund-policy" className="text-pink-300 hover:text-pink-200">Refund Policy</a> will apply.</p>
          </div>
        </Reveal>

        {/* New Section for Website Verification in Razorpay */}
        <Reveal delay={180} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Website Verification in Razorpay</h2>
            <p className="mt-3 text-white/80">
              To verify your website or application with Razorpay, ensure that your website is live, functional, and complies with Razorpay's standards. If verification is pending or rejected, contact our support team with relevant details for assistance. We do not process returns or refunds for verification issues but will help you complete the process smoothly.
            </p>
            <p className="mt-3 text-white/80">
              For any verification-related queries, please contact us at <a href="mailto:dashrathpro.dev@gmail.com" className="text-pink-300 hover:text-pink-200">dashrathpro.dev@gmail.com</a> or call <a href="tel:+917415090947" className="text-pink-300 hover:text-pink-200">+91 7415090947</a>.
            </p>
            <p className="mt-3 text-white/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </Reveal>

        {/* Contact Section */}
        <Reveal delay={200} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3 text-white/80">Email <a href="mailto:dashrathpro.dev@gmail.com" className="text-pink-300 hover:text-pink-200">dashrathpro.dev@gmail.com</a> or call <a href="tel:+917415090947" className="text-pink-300 hover:text-pink-200">+91 7415090947</a>.</p>
            <p className="mt-3 text-white/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
