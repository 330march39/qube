// A simple service worker for basic caching
const CACHE_NAME = 'qube-cache-v1';
const urlsToCache = [
  '/',
  'index.html', // Or your main HTML file name
  'icon.png',
  'iconp.png',
  'iconsp.png',
  'icon-192x192.png',
  'icon-512x512.png',
  'manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});
