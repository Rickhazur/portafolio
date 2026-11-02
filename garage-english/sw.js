// Offline cache: app shell + images precached, audio cached the first time it plays.
const V='garage-english-v3-5';
const SHELL=['./','index.html','style.css','app.js','data.js','audio/available.js','manifest.webmanifest','img/car.webp','img/inside.webp','img/wiper.webp','img/antenna.webp','img/exhaust.webp','img/hubcap.webp','img/grille.webp','img/fuelcap.webp','img/poster1.webp','img/poster2.webp','img/icon-192.png',...[1,2,3,4,5,6,7,8,9].map(i=>'img/map'+i+'.webp')];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()).then(()=>self.clients.matchAll({type:'window',includeUncontrolled:true})).then(cs=>cs.forEach(c=>{ if(c.url.includes('/preview/')&&c.navigate) c.navigate(c.url).catch(()=>{}); }))));
// old cached copies of the preview are reloaded fresh as soon as this worker takes over
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET') return;
  // the preview is always fetched fresh (never served from this cache)
  if(new URL(e.request.url).pathname.includes('/preview/')||e.request.url.includes('/preview/')||(e.request.referrer||'').includes('/preview/')) return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{ if(res.ok&&new URL(e.request.url).origin===location.origin){const cp=res.clone();caches.open(V).then(c=>c.put(e.request,cp));} return res; })));
});
