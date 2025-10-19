// Minimal service worker so getToken can bind to a registration.
// You can customize background handling later if you need data-only messages.
self.addEventListener('push', () => {});
self.addEventListener('notificationclick', (event) => {
  event.notification?.close?.();
});