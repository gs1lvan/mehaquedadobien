const CACHE_NAME = 'recetario-personal-v3';
const STATIC_CACHE = 'recetario-static-v3';
const DYNAMIC_CACHE = 'recetario-dynamic-v3';

// Assets estáticos que se cachean en la instalación
const staticAssets = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './models.js',
  './manifest.json',
  './icon-192.svg',
  './icon-512.svg',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
];

// Instalar Service Worker con estrategia cache-first para assets estáticos
self.addEventListener('install', event => {
  console.log('[SW] Instalando Service Worker...');
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('[SW] Cacheando assets estáticos');
        return cache.addAll(staticAssets);
      })
      .then(() => {
        console.log('[SW] Assets estáticos cacheados exitosamente');
        // Forzar activación inmediata del nuevo service worker
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[SW] Error al cachear assets:', error);
      })
  );
});

// Activar Service Worker y limpiar caches antiguos
self.addEventListener('activate', event => {
  console.log('[SW] Activando Service Worker...');
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            // Eliminar caches antiguos que no coincidan con las versiones actuales
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Eliminando cache antiguo:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[SW] Service Worker activado');
        // Tomar control de todas las páginas inmediatamente
        return self.clients.claim();
      })
  );
});

// Interceptar requests con estrategia cache-first para assets estáticos
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // Estrategia cache-first para assets estáticos
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request));
  }
  // Network-first para datos dinámicos (IndexedDB no se cachea)
  else {
    event.respondWith(networkFirst(request));
  }
});

// Determinar si es un asset estático
function isStaticAsset(url) {
  // Assets estáticos: HTML, CSS, JS, imágenes, fuentes, manifest
  const staticExtensions = ['.html', '.css', '.js', '.svg', '.png', '.jpg', '.jpeg', '.webp', '.json', '.woff', '.woff2'];
  const pathname = url.pathname;

  // Verificar si es un CDN externo (jsPDF)
  if (url.origin !== location.origin) {
    return url.href.includes('jspdf');
  }

  return staticExtensions.some(ext => pathname.endsWith(ext));
}

// Estrategia cache-first: buscar en cache primero, luego red
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      console.log('[SW] Sirviendo desde cache:', request.url);
      return cachedResponse;
    }

    console.log('[SW] No encontrado en cache, obteniendo de red:', request.url);
    const networkResponse = await fetch(request);

    // Cachear la respuesta para futuras peticiones
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Error en cache-first:', error);
    // Si falla todo, devolver página offline si existe
    return caches.match('./index.html');
  }
}

// Estrategia network-first: intentar red primero, luego cache
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);

    // Cachear respuestas exitosas en cache dinámico
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Red no disponible, buscando en cache:', request.url);
    const cachedResponse = await caches.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    // Si no hay cache, devolver respuesta de error
    return new Response('Contenido no disponible offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain'
      })
    });
  }
}

// Escuchar mensajes del cliente para manejar actualizaciones
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    console.log('[SW] Recibido mensaje SKIP_WAITING, activando nuevo SW');
    self.skipWaiting();
  }
});
