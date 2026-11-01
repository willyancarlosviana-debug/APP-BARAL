const CACHE_NAME = 'samauma-app-v2';
const APP_SHELL = ['./index.html', './manifest.json', './icons/icon-192.png', './icons/icon-512.png'];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        )
    );
    self.clients.claim();
});

// Network-first: sempre tenta buscar a versão mais nova; usa o cache só se estiver offline.
// Só cuida dos arquivos do próprio app: as chamadas ao Supabase (dados e login) nunca passam por aqui,
// para que dados reais não fiquem guardados no cache do aparelho.
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    if (new URL(event.request.url).origin !== self.location.origin) return;
    event.respondWith(
        fetch(event.request, { cache: 'no-cache' }) // revalida com o servidor, sem usar cópia velha do navegador
            .then((response) => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
