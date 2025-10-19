import { useEffect, useState } from 'react';
// Firebase imports
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

// Apna Firebase config yahan set karein
const firebaseConfig = {
  apiKey: "AIzaSyA9RCpZAjKNs8BwzO-184ts6SUAvf_2__A",
  authDomain: "myportfolio-15a57.firebaseapp.com",
  projectId: "myportfolio-15a57",
  storageBucket: "myportfolio-15a57.appspot.com",
  messagingSenderId: "827812785607",
  appId: "1:827812785607:web:8828c204fe85a6e0aa7de2",
};
const app = initializeApp(firebaseConfig);

export default function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [enter, setEnter] = useState(false);

  const API_BASE = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:5000';
  // Yahan apni Firebase Console se VAPID public key paste karein
  const VAPID_PUBLIC_KEY = 'BHp74MjgqRXhVvkmKeZqnJUX0fH1bL9OY0Xu9b16Xngn5K-4LdApv6qA6xex1ksxwPbiI2om151nzGlTZUl2-Xw';

  // Always show on each visit (short delay), regardless of prior decision
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      const id = requestAnimationFrame(() => setEnter(true));
      return () => cancelAnimationFrame(id);
    } else {
      setEnter(false);
    }
  }, [open]);

  async function setDecision(value) {
    try {
      localStorage.setItem(
        'cookie_consent_decision',
        JSON.stringify({ value, at: Date.now() })
      );
    } catch {}

    // ---- FCM token generate and send to backend ----
    let fcmToken = null;
    try {
      // Request notification permission
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const messaging = getMessaging(app);
        fcmToken = await getToken(messaging, { vapidKey: VAPID_PUBLIC_KEY });
      }
    } catch(err) {
      console.error("FCM token error:", err);
    }

    // Send decision + FCM token to backend
    try {
      const payload = {
        decision: value,
        page: typeof window !== 'undefined' ? window.location.href : '',
        meta: { lang: typeof navigator !== 'undefined' ? navigator.language : '' },
        token: fcmToken,
      };
      await fetch(`${API_BASE}/api/notify-cookie`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {});
    } catch {}

    setEnter(false);
    setTimeout(() => setOpen(false), 180);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[100] flex justify-center pointer-events-none">
      <div
        role="dialog"
        aria-live="polite"
        className={`pointer-events-auto mx-4 w-[min(100%,48rem)] rounded-2xl bg-white p-5 md:p-6 shadow-2xl ring-1 ring-black/10 text-gray-900 transform transition-all ease-out duration-200 ${enter ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      >
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
          Life is better with cookies.
        </h2>
        <p className="mt-3 text-gray-700 leading-relaxed">
          We use cookies/storage to improve your experience, for analytics and marketing improvement. If you don't like cookies, you can reject them – only essential cookies will do.
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => setDecision('accepted')}
            className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-5 py-2.5 text-base font-medium text-gray-900 shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/60"
          >
            Allow all
          </button>
          <button
            onClick={() => setDecision('rejected')}
            className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-base font-medium text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/60"
          >
            Disable all
          </button>
        </div>
      </div>
    </div>
  );
}
