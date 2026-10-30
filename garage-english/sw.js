// Offline cache: app shell + images precached, audio cached the first time it plays.
const V='garage-english-v3-2';
const SHELL=['./','index.html','style.css','app.js','data.js','audio/available.js','manifest.webmanifest','img/car.webp','img/inside.webp','img/wiper.webp','img/poster1.webp','img/poster2.webp','img/icon-192.png',...[1,2,3,4,5,6,7,8,9].map(i=>'img/map'+i+'.webp')];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));} return res; })));
});
