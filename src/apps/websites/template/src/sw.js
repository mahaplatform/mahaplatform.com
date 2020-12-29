import { CacheableResponsePlugin } from 'workbox-cacheable-response'
import { precacheAndRoute } from 'workbox-precaching'
import { ExpirationPlugin } from 'workbox-expiration'
import { NetworkFirst } from 'workbox-strategies'
import { registerRoute } from 'workbox-routing'

precacheAndRoute(self.__WB_MANIFEST)

registerRoute(
  request => request.mode === 'navigate',
  new NetworkFirst({
    cacheName: 'pages',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200]
      }),
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 12 * 60 * 60
      })
    ]
  }), 'GET')
