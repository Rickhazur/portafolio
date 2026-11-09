/* Retire the Garage English v3 cache.
   Returning visitors still have this script's previous version controlling /garage-english/.
   Their cached index calls register('sw.js'), the browser fetches this file, and this worker
   deletes every cache, drops the registration, and reloads open tabs onto the network.
   Pages of the photo build must not register this file again. */
self.addEventListener('install', () => {
  self.skipWaiting();
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map(key => caches.delete(key)));
    await self.clients.claim();
    const clients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    await self.registration.unregister();
    await Promise.all(clients.map(client => (client.navigate ? client.navigate(client.url) : Promise.resolve())));
  })());
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request));
});
