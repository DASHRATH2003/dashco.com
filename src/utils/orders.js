import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.js';

/**
 * Save a paid order to Firestore for admin dashboard/analytics.
 * @param {Object} params
 * @param {number} params.amountRupees - Amount in INR rupees.
 * @param {string} [params.currency='INR'] - Currency code.
 * @param {string} [params.project] - Project/title/template purchased.
 * @param {string} [params.paymentId] - Razorpay payment id.
 * @param {string} [params.orderId] - Razorpay order id.
 * @param {Object} [params.meta] - Extra metadata (e.g., link, email, phone).
 * @param {string} [params.source] - Where the order originated from (checkout, marquee, carousel).
 */
export async function saveOrderToFirestore({ amountRupees, currency = 'INR', project, paymentId, orderId, meta = {}, source = 'checkout' }) {
  const payload = {
    amountRupees: Number(amountRupees) || 0,
    currency,
    project: project || '',
    paymentId: paymentId || '',
    orderId: orderId || '',
    meta: meta || {},
    source,
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, 'orders'), payload);
  return true;
}