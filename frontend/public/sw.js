const CACHE_NAME = 'nxs-world-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/assets/',
];

// Install event - cache key assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Service Worker: Caching assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first strategy for API calls, cache-first for assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // API calls: network-first
  if (url.pathname.startsWith('/api/') || url.hostname !== self.location.hostname) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then((c) => c.put(request, response.clone()));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Assets: cache-first
  event.respondWith(
    caches.match(request).then((response) => {
      return response || fetch(request)
        .then((fetchResponse) => {
          if (fetchResponse.ok) {
            const cache = caches.open(CACHE_NAME);
            cache.then((c) => c.put(request, fetchResponse.clone()));
          }
          return fetchResponse;
        })
        .catch(() => {
          // Return offline page if available
          return caches.match('/index.html');
        });
    })
  );
});
