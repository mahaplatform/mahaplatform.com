import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute } from 'workbox-precaching'
import { ExpirationPlugin } from 'workbox-expiration'
import { NetworkFirst } from 'workbox-strategies'
import { registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

const plugins = [
  new CacheableResponsePlugin({
    statuses: [0, 200]
  }),
  new ExpirationPlugin({
    maxEntries: 20,
    maxAgeSeconds: 12 * 60 * 60
  })
]

registerRoute(
  new RegExp('.*\\.(?:png|jpg|webp|jpeg)'),
  new NetworkFirst({
    cacheName: 'images',
    plugins
  }), 'GET'
)

registerRoute(
  ({ request }) => /_next/.test(request.url),
  new NetworkFirst({
    cacheName: 'next',
    plugins
  }), 'GET'
)

registerRoute(
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins
  }), 'GET'
)
