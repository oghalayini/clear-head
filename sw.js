// Clear Head service worker: keeps the app itself available offline.
// Your tasks are cached separately by Firestore, so they're available offline too.
const CACHE = "clearhead-v1";
const SHELL = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

function saveCopy(req, res){
  if (res && res.ok){ const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); }
  return res;
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // The app's own files: try the network first so updates show up, fall back to the saved copy.
  if (url.origin === self.location.origin){
    e.respondWith(
      fetch(req).then(res => saveCopy(req, res))
        .catch(() => caches.match(req).then(r => r || caches.match("./index.html")))
    );
    return;
  }

  // Firebase's code libraries never change for a given version: use the saved copy when there is one.
  if (url.hostname === "www.gstatic.com" && url.pathname.startsWith("/firebasejs/")){
    e.respondWith(caches.match(req).then(r => r || fetch(req).then(res => saveCopy(req, res))));
  }
  // Everything else (Firestore, sign-in, fonts) goes straight to the network.
});
