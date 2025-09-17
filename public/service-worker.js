// Service Worker for AsaSnaps - Asavela Mavanda Photography

const CACHE_NAME = 'asasnaps-v1';
const OFFLINE_URL = '/offline.html';
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/src/main.jsx',
  '/src/App.jsx',
  '/src/styles/global.css',
  '/src/assets/logo.svg',
  '/favicon.ico',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  '/safari-pinned-tab.svg'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
          return null;
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, then cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  // Skip non-http(s) requests
  if (!event.request.url.startsWith('http')) return;

  // Skip Chrome extensions and dev tools
  if (event.request.url.includes('browser-sync') || 
      event.request.url.includes('chrome-extension')) {
    return;
  }

  event.respondWith(
    // Try network first
    fetch(event.request)
      .then((response) => {
        // Check if we received a valid response
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        // Clone the response
        const responseToCache = response.clone();

        // Cache the response
        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // If network fails, try cache
        return caches.match(event.request)
          .then((response) => {
            // Return cached response or offline page
            return response || caches.match(OFFLINE_URL);
          });
      })
  );
});

// Push notification event listener
self.addEventListener('push', (event) => {
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return;
  }

  const data = event.data.json();
  const title = data.title || 'AsaSnaps Update';
  const options = {
    body: data.body || 'You have new updates from AsaSnaps',
    icon: '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
    },
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    self.clients.matchAll({ type: 'window' })
      .then((clientList) => {
        if (clientList.length > 0) {
          return clientList[0].focus();
        }
        return self.clients.openWindow(event.notification.data.url || '/');
      })
  );
});

// Background sync registration
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-form-data') {
    event.waitUntil(processFormData());
  }
});

// Example background sync function
function processFormData() {
  return new Promise((resolve) => {
    // Process any pending form data
    console.log('Processing form data in the background');
    resolve();
  });
}
