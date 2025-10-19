import Reveal from '../components/Reveal.jsx'

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <Reveal direction="up">
        <div>
          <div className="text-xs uppercase tracking-widest text-pink-400/80">Legal</div>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-white">Privacy Policy</h1>
          <p className="mt-3 text-white/70 max-w-3xl">This Privacy Policy explains how we collect, use, and safeguard your information when you use our website, purchase digital products (source code/templates), or contact us. By using this site, you agree to the practices described below.</p>
        </div>
      </Reveal>

      <section className="mt-10 space-y-10">
        <Reveal direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Information We Collect</h2>
            <ul className="mt-3 list-disc pl-6 text-white/80 space-y-1">
              <li>Contact details you share, such as name, email address, and phone number.</li>
              <li>Purchase and billing details processed securely by our payment partner (Razorpay).</li>
              <li>Basic device and usage data (e.g., cookies, IP, pages visited) for analytics and site reliability.</li>
              <li>Any information you provide when you reach out for support or inquiries.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={120} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">How We Use Your Information</h2>
            <ul className="mt-3 list-disc pl-6 text-white/80 space-y-1">
              <li>To deliver your digital product and related support.</li>
              <li>To process payments and send order confirmations/updates.</li>
              <li>To improve our website, content quality, and user experience.</li>
              <li>To prevent fraud, abuse, or violations of our policies.</li>
            </ul>
          </div>
        </Reveal>

        <Reveal delay={160} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Payments and Razorpay</h2>
            <p className="mt-3 text-white/80">We use Razorpay to process payments. Your payment data is handled by Razorpay in accordance with their security and privacy standards. We do not store full card or UPI details on our servers.</p>
            <p className="mt-3 text-white/70 text-sm">Learn more: <a href="https://razorpay.com/privacy/" target="_blank" rel="noreferrer" className="text-pink-300 hover:text-pink-200">Razorpay Privacy Policy ↗</a></p>
          </div>
        </Reveal>

        <Reveal delay={200} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Cookies</h2>
            <p className="mt-3 text-white/80">We use essential and analytics cookies to keep the site reliable and to understand usage. You can control cookies via your browser settings. Disabling some cookies may affect site functionality.</p>
          </div>
        </Reveal>

        <Reveal delay={240} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Data Security and Retention</h2>
            <p className="mt-3 text-white/80">We apply reasonable technical and organizational measures to protect your data. We retain information only as long as necessary for the purposes described above, or as required by law.</p>
          </div>
        </Reveal>

        <Reveal delay={280} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Your Rights</h2>
            <p className="mt-3 text-white/80">You can request access, correction, or deletion of your personal data subject to applicable laws. Drop us an email and we’ll help.</p>
          </div>
        </Reveal>

        <Reveal delay={320} direction="up">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6 ring-1 ring-white/10">
            <h2 className="text-xl font-semibold text-white">Contact</h2>
            <p className="mt-3 text-white/80">Questions? Email <a href="mailto:dashrathpro.dev@gmail.com" className="text-pink-300 hover:text-pink-200">dashrathpro.dev@gmail.com</a> or call <a href="tel:+917415090947" className="text-pink-300 hover:text-pink-200">+91 7415090947</a>.</p>
            <p className="mt-3 text-white/50 text-sm">Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </Reveal>
      </section>
    </main>
  )
}