import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Blog from './pages/Blog.jsx';
import Contact from './pages/Contact.jsx';
// ❌ Removed missing import: import Dashboard from './pages/Dashboard.jsx';
import AdminLogin from './pages/AdminLogin.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import RequireAdmin from './components/RequireAdmin.jsx';
import Footer from './components/Footer.jsx';
import FooterMarquee from './components/FooterMarquee.jsx';
import FooterVideo from './components/FooterVideo.jsx';
import ServiceDetail from './pages/ServiceDetail.jsx';
import Projects from './pages/Projects.jsx'; // ⚠️ Make sure this file exists!
import Checkout from './pages/Checkout.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import RefundPolicy from './pages/RefundPolicy.jsx';
import ReturnPolicy from './pages/ReturnPolicy.jsx';
import TermsOfService from './pages/TermsOfService.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ChatWidget from './components/ChatWidget.jsx';
import CookieConsent from './components/CookieConsent.jsx';
import BlogPromo from './components/BlogPromo.jsx';
import ContactBottom from './components/ContactBottom.jsx';

import { useEffect } from 'react';
import { doc, setDoc, serverTimestamp, increment } from 'firebase/firestore';
import { db } from './firebase.js';

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    try {
      const key = `visitLogged-${new Date().toISOString().slice(0,10)}`; // once per day
      if (!localStorage.getItem(key)) {
        setDoc(
          doc(db, 'metrics', 'summary'),
          { totalVisits: increment(1), lastVisitAt: serverTimestamp() },
          { merge: true }
        ).catch(() => {});
        localStorage.setItem(key, '1');
      }
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f1020] to-[#1a1b2f] text-white">
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        {/* ❌ Removed non-existing Dashboard route */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
        {/* Policy routes */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
      {!isAdminRoute && (
        <>
          <BlogPromo />
         
          <FooterMarquee />
          <FooterVideo />
          <ContactBottom />
          <Footer />
          <CookieConsent />
          <ChatWidget />
        </>
      )}
    </div>
  );
}

export default App;
