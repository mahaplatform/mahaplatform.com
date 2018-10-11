self.addEventListener('push', event => {

  if (!event.data) return

  const { title, body, url } = event.data.json()

  const data = {
    icon: '/admin/images/maha.png',
    sound: '/admin/audio/notification.mp3',
    body,
    data: {
      url: url
    }
  }

  return self.registration.showNotification(title, data)

})

self.addEventListener('notificationclick', event => {

  event.notification.close()

  const url = event.notification.data.url

  const eventUrl = new URL(url)

  event.waitUntil(self.clients.matchAll({
    includeUncontrolled: true
  }).then(clientList => {

    clientList.map(client => {

      const clientUrl = new URL(client.url)

      if(clientUrl.host === eventUrl.host && 'focus' in client) {

        return client.focus()

      }

    })

    if(self.clients.openWindow) return self.clients.openWindow(url)

  }))

})
