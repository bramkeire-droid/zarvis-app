// B-289 (baan SCHERM): de service worker van Zarvis op de gsm. Hij doet maar twee dingen:
// een pushmelding tonen (die draagt geen tekst) en bij een tik Zarvis openen. Hij bewaart niets.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

self.addEventListener('push', (e) => {
  e.waitUntil(self.registration.showNotification('Zarvis', {
    body: 'Zarvis heeft een melding voor je.',
    icon: 'icon-192.png',
    badge: 'icon-192.png',
    tag: 'zarvis',
    renotify: true,
  }));
});

self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil((async () => {
    const open = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of open) if ('focus' in c) return c.focus();
    return self.clients.openWindow('./');
  })());
});
