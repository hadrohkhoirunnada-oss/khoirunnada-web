const CACHE_PREFIX = "khoirunnada-pwa";
const CACHE_VERSION = "v1";
const STATIC_CACHE = `${CACHE_PREFIX}-${CACHE_VERSION}-static`;

const STATIC_ASSETS = [
  "/logo/khoirunnada-logo.png",
  "/icons/social/facebook.png",
  "/icons/social/instagram.png",
  "/icons/social/youtube.png",
  "/icons/social/tiktok.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch(() => null)
  );

  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) =>
        Promise.all(
          cacheNames
            .filter(
              (cacheName) =>
                cacheName.startsWith(CACHE_PREFIX) &&
                cacheName !== STATIC_CACHE
            )
            .map((cacheName) => caches.delete(cacheName))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(
        () =>
          new Response(
            `<!doctype html>
            <html lang="id">
              <head>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Khoirunnada Offline</title>
                <style>
                  body {
                    margin: 0;
                    min-height: 100vh;
                    display: grid;
                    place-items: center;
                    background: #02040a;
                    color: #f8fafc;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
                  }
                  main {
                    width: min(88vw, 390px);
                    padding: 28px;
                    border: 1px solid rgba(245, 197, 66, 0.22);
                    border-radius: 28px;
                    background: rgba(0, 0, 0, 0.42);
                    text-align: center;
                    box-shadow: 0 22px 80px rgba(0, 0, 0, 0.5);
                  }
                  h1 {
                    margin: 0;
                    color: #facc15;
                    font-size: 18px;
                    letter-spacing: 0.14em;
                    text-transform: uppercase;
                  }
                  p {
                    margin: 16px 0 0;
                    color: #cbd5e1;
                    line-height: 1.7;
                    font-size: 14px;
                  }
                </style>
              </head>
              <body>
                <main>
                  <h1>Khoirunnada</h1>
                  <p>Koneksi internet sedang tidak tersedia. Silakan hubungkan internet lalu buka kembali.</p>
                </main>
              </body>
            </html>`,
            {
              headers: {
                "Content-Type": "text/html; charset=utf-8",
              },
            }
          )
      )
    );

    return;
  }

  const cacheableDestinations = ["image", "style", "script", "font"];

  if (
    cacheableDestinations.includes(request.destination) ||
    url.pathname === "/manifest.webmanifest"
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (!networkResponse || !networkResponse.ok) {
              return networkResponse;
            }

            const clonedResponse = networkResponse.clone();

            caches.open(STATIC_CACHE).then((cache) => {
              cache.put(request, clonedResponse);
            });

            return networkResponse;
          })
          .catch(() => cachedResponse);
      })
    );
  }
});