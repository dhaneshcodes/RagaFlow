const CACHE_NAME = 'ragaflow-v1';
const BASE_PATH = '/RagaFlow';
const urlsToCache = [
    BASE_PATH + '/',
    BASE_PATH + '/index.html',
    BASE_PATH + '/manifest.json',
    BASE_PATH + '/assets/icons/favicon.svg'
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
    const url = new URL(event.request.url);
    const path = url.pathname;
    
    // If request is for base path, serve from cache
    if (path.startsWith(BASE_PATH) || path === '/' || path === '/index.html') {
        event.respondWith(
            caches.match(event.request)
                .then(response => {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                })
        );
    } else {
        // For other requests, just fetch normally
        event.respondWith(fetch(event.request));
    }
});
