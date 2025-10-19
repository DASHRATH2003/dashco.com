export const servicesList = [
  { title: 'Custom Website Development', slug: 'custom-website-development', blurb: 'Tailored business sites with modern stacks and SEO.' },
  { title: 'E‑commerce Website Development', slug: 'ecommerce-website-development', blurb: 'Stores with product catalog, cart, checkout, and payments.' },
  { title: 'Frontend Development', slug: 'frontend-development', blurb: 'Responsive UI in React/Vite/Tailwind with SPA routing.' },
  { title: 'Backend/API Development', slug: 'backend-api-development', blurb: 'Secure REST APIs, auth, databases, and integrations.' },
  { title: 'Mobile App Development', slug: 'mobile-app-development', blurb: 'Cross‑platform apps with React Native and modern tooling.' },
  { title: 'UI/UX Design', slug: 'ui-ux-design', blurb: 'Wireframes, visual design, prototypes, and design systems.' },
  { title: 'Performance Optimization', slug: 'performance-optimization', blurb: 'Improve speed, Lighthouse scores, caching, and bundle size.' },
  { title: 'Payment Gateway Integration', slug: 'payment-gateway-integration', blurb: 'Integrate Stripe/Razorpay with secure transactions.' },
];

// Detailed content per service
export const servicesDetails = {
  'custom-website-development': {
    hero: 'Custom Website Development',
    overview: 'Business‑focused custom websites with modern stacks, SEO, and responsive UI. Clean architecture, CMS options, and deployment pipelines included.',
    features: ['Responsive UI', 'SEO setup', 'Contact forms', 'CMS or headless', 'Analytics', 'Deployment & CI'],
    deliverables: ['Home + inner pages', 'Blog/Content modules', 'Reusable components', 'Performance tuning', 'Basic documentation'],
  },
  'ecommerce-website-development': {
    hero: 'E‑commerce Website Development',
    overview: 'Storefronts with product catalog, cart, checkout, payments, and order flows. Scalable architecture, admin tools, and tracking.',
    features: ['Product listing', 'Cart & checkout', 'Payments (Stripe/Razorpay)', 'Orders & emails', 'Coupons/Tax/Shipping', 'Mobile‑friendly'],
    deliverables: ['Product templates', 'Checkout flow', 'Payment integration', 'Order management', 'Basic dashboard'],
  },
  'frontend-development': {
    hero: 'Frontend Development',
    overview: 'Modern React/Vite/Tailwind UIs with SPA routing, animations, and accessibility. Component‑driven design systems.',
    features: ['SPA routing', 'Animations & transitions', 'A11y compliance', 'Reusable components', 'Design system'],
    deliverables: ['Pages & routes', 'State management', 'Interactive components', 'Testing setup'],
  },
  'backend-api-development': {
    hero: 'Backend/API Development',
    overview: 'Secure REST APIs with auth, database modeling, and integrations. Production‑ready with logging and monitoring.',
    features: ['Auth (JWT/OAuth)', 'CRUD APIs', 'DB schema', 'Integrations', 'Validation', 'Rate limiting'],
    deliverables: ['API endpoints', 'DB migrations', 'Env & configs', 'Basic docs'],
  },
  'mobile-app-development': {
    hero: 'Mobile App Development',
    overview: 'Cross‑platform apps with React Native, modern navigation, and offline support. App store readiness.',
    features: ['RN stack', 'Navigation', 'Offline & caching', 'Push notifications', 'Native modules'],
    deliverables: ['Screens & flows', 'API integration', 'Build scripts', 'Store guidelines'],
  },
  'ui-ux-design': {
    hero: 'UI/UX Design',
    overview: 'Wireframes to polished UI — prototypes, components, and usability guidelines.',
    features: ['Wireframes', 'High‑fidelity mocks', 'Design tokens', 'Prototypes', 'A/B suggestions'],
    deliverables: ['Figma files', 'Design system', 'Hand‑off docs'],
  },
  'performance-optimization': {
    hero: 'Performance Optimization',
    overview: 'Improve speed, Lighthouse scores, and Core Web Vitals with code‑splitting, caching, and image optimization.',
    features: ['Bundle analysis', 'Code‑split & lazy‑load', 'Image optimization', 'Caching/CDN', 'Perf monitoring'],
    deliverables: ['Perf report', 'Action plan', 'Optimized build'],
  },
  'payment-gateway-integration': {
    hero: 'Payment Gateway Integration',
    overview: 'Integrate secure payments with Stripe/Razorpay, webhooks, and receipts. Test and live mode setup.',
    features: ['Checkout/UPI/cards', 'Webhooks', 'Receipts/emails', 'Fraud checks', 'Test & live keys'],
    deliverables: ['Payment flow', 'Webhook handlers', 'Docs for settlement'],
  },
};

export const servicesNav = servicesList.map(s => ({ label: s.title, to: `/services/${s.slug}` }));