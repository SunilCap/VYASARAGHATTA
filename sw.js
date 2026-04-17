/* =====================================================================
   Vyasaraghatta — Service Worker
   © 2026 Sunil Malleshaiah. All rights reserved.
   Offline-first caching with versioned invalidation.
   Bump APP_VERSION below on every release.
   ===================================================================== */

const APP_VERSION = '0.3.0';
const CACHE_VERSION = `vyasaraghatta-${APP_VERSION}`;

const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

// Install: pre-cache the shell. Do NOT call skipWaiting here — we wait
// for the user to tap "Update now" in the banner.
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.addAll(CORE_ASSETS).catch((err) => {
        console.warn('[SW] Pre-cache partial failure:', err);
      })
    )
  );
});

// Activate: clean up old caches.
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

// Message from page: "take over now"
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch strategies:
//  - Navigation (HTML): network-first, fallback to cached index.html
//  - Other GETs: stale-while-revalidate
self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);

  // HTML navigations
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(request, copy));
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Stale-while-revalidate for everything else
  event.respondWith(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.match(request).then((cached) => {
        const networkFetch = fetch(request)
          .then((res) => {
            if (res && res.status === 200 &&
                (url.origin === location.origin || res.type === 'cors' || res.type === 'basic')) {
              cache.put(request, res.clone()).catch(() => {});
            }
            return res;
          })
          .catch(() => cached);
        return cached || networkFetch;
      })
    )
  );
});
