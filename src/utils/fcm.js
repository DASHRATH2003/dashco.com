import { getMessaging, getToken, isSupported } from 'firebase/messaging';
import { app } from '../firebase';

export async function getFcmToken(vapidKey) {
  const supported = await isSupported();
  if (!supported) throw new Error('This browser does not support Web FCM');
  if (!('Notification' in window)) throw new Error('Notifications API not available');
  if (!navigator.serviceWorker) throw new Error('Service Worker not available');

  const perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error('Notification permission denied');

  const swReg = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
  const messaging = getMessaging(app);
  const token = await getToken(messaging, { vapidKey, serviceWorkerRegistration: swReg });
  return token;
}

export async function sendCookieConsent({ token, decision = 'accepted', page = window.location.href, meta = {} }) {
  const res = await fetch('http://localhost:5000/api/notify-cookie', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, decision, page, meta }),
  });
  const json = await res.json();
  if (!res.ok) throw Object.assign(new Error(json.error || 'request_failed'), { response: json });
  return json;
}