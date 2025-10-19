const API_BASE = import.meta.env?.VITE_BACKEND_URL || 'http://localhost:5000';

export async function loadRazorpay() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) return resolve(true);
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay'));
    document.body.appendChild(script);
  });
}

async function fetchKey() {
  try {
    const res = await fetch(`${API_BASE}/api/key`);
    const data = await res.json();
    const backendKey = data?.key_id;
    const envKey = import.meta.env?.VITE_RAZORPAY_KEY_ID;
    return backendKey || envKey || '';
  } catch {
    const envKey = import.meta.env?.VITE_RAZORPAY_KEY_ID;
    return envKey || '';
  }
}

export async function startPayment({ amountRupees, name, description, notes }) {
  await loadRazorpay();
  const key = await fetchKey();
  if (!key) throw new Error('Razorpay key missing');

  // Create order on backend
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: amountRupees, currency: 'INR', notes }),
  });
  const { order, error } = await res.json();
  if (error) throw new Error('Order creation failed');
  if (!order || !order.id) throw new Error('Order creation failed');

  return new Promise((resolve, reject) => {
    const rzp = new window.Razorpay({
      key,
      amount: order.amount, // paise
      currency: order.currency,
      name: name || 'Website Purchase',
      description: description || 'Template checkout',
      order_id: order.id,
      notes,
      theme: { color: '#ec4899' },
      handler: async function (response) {
        try {
          const verifyRes = await fetch(`${API_BASE}/api/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });
          const verify = await verifyRes.json();
          if (verify.success) {
            resolve(response);
          } else {
            reject(new Error('Verification failed'));
          }
        } catch (e) {
          reject(e);
        }
      },
      modal: {
        ondismiss: function () {
          reject(new Error('Payment cancelled'));
        }
      },
      prefill: {
        email: 'user@example.com',
        contact: '9999999999',
      },
    });
    rzp.open();
  });
}