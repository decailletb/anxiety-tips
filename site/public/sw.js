// Service worker maison : rend tout le site disponible hors ligne.
// - À l'installation : met en cache toutes les pages et fichiers du site.
//   La liste et la version sont écrites au build par integrations/sw-precache.mjs
//   (entre les marqueurs ci-dessous). Sans build, seule la liste minimale sert.
// - Pages (navigation) : réseau d'abord (contenu à jour en ligne), repli sur le cache hors ligne.
// - Autres fichiers (icônes, scripts, manifest) : cache d'abord.
// - À l'activation : suppression des anciens caches.
// Rien n'est envoyé nulle part : ce fichier ne fait que lire le site lui-même.

const VERSION = /*SW_VERSION*/ 'dev' /*END*/;
const PRECACHE = /*SW_PRECACHE*/ ['./', 'trousse/', 'aide/', 'journal/', 'favicon.svg', 'manifest.webmanifest'] /*END*/;

const PREFIX = 'vague-';
const CACHE = PREFIX + VERSION;
// Pages indispensables : l'installation échoue (et sera retentée) si l'une manque.
const CORE = ['./', 'trousse/', 'aide/', 'journal/', 'favicon.svg', 'manifest.webmanifest'];
// Au-delà de ce délai sans réponse du réseau, on sert la copie en cache (connexion faible).
const NETWORK_TIMEOUT_MS = 4000;

const scope = self.registration.scope; // ex. https://…/anxiety-tips/
const abs = (p) => new URL(p, scope).href;

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      const fresh = (p) => new Request(abs(p), { cache: 'reload' });
      await cache.addAll(CORE.map(fresh));
      const rest = PRECACHE.filter((p) => !CORE.includes(p));
      // Une page manquante ne bloque pas l'installation.
      await Promise.all(rest.map((p) => cache.add(fresh(p)).catch(() => {})));
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k.startsWith(PREFIX) && k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

async function fromCache(request) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(request, { ignoreSearch: true });
  if (hit) return hit;
  // /anxiety-tips/journal -> /anxiety-tips/journal/
  const u = new URL(request.url);
  if (!u.pathname.endsWith('/') && !u.pathname.split('/').pop().includes('.')) {
    return cache.match(u.origin + u.pathname + '/');
  }
  return undefined;
}

async function networkFirst(event) {
  const { request } = event;
  const cache = await caches.open(CACHE);
  const network = fetch(request).then((res) => {
    if (res.ok && res.type === 'basic') event.waitUntil(cache.put(request, res.clone()));
    return res;
  });
  network.catch(() => {}); // évite une erreur non gérée si le cache a déjà répondu
  const timeout = new Promise((resolve) => setTimeout(resolve, NETWORK_TIMEOUT_MS));
  try {
    // Réseau lent : on sert la copie locale si elle existe, le réseau met le cache à jour en arrière-plan.
    const first = await Promise.race([network, timeout.then(() => fromCache(request))]);
    if (first) return first;
    return await network;
  } catch {
    return (await fromCache(request)) || (await cache.match(abs('./'))) || Response.error();
  }
}

async function cacheFirst(event) {
  const { request } = event;
  const hit = await fromCache(request);
  if (hit) return hit;
  const res = await fetch(request);
  if (res.ok && res.type === 'basic') {
    const cache = await caches.open(CACHE);
    event.waitUntil(cache.put(request, res.clone()));
  }
  return res;
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(scope)) return;
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(event));
  } else {
    event.respondWith(cacheFirst(event));
  }
});
