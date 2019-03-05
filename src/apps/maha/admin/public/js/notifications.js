importScripts('https://www.gstatic.com/firebasejs/5.5.7/firebase-app.js')

importScripts('https://www.gstatic.com/firebasejs/5.5.7/firebase-messaging.js')

const [, apiKey, messagingSenderId, host ] = location.search.slice(1).match(/^apiKey=(.*)&messagingSenderId=(\d*)&host=(.*)$/)

firebase.initializeApp({
  apiKey,
  messagingSenderId
})

const messaging = firebase.messaging()

messaging.setBackgroundMessageHandler((notification) => {

  const { title } = notification.data

  return self.registration.showNotification(title, {
    body: notification.data.body,
    data: notification.data
  })

})

self.addEventListener('notificationclick', event => {

  const pathname = event.notification.data.route

  event.waitUntil(

    clients.matchAll({
      includeUncontrolled: true,
      type: 'window'
    }).then(clientList => {

      const client = clientList.find(client => {
        const url = new URL(client.url)
        return url.host === host && 'focus' in client && 'postMessage' in client
      })

      if(!client) return clients.openWindow(host + pathname)

      client.focus()

      if(client.url === host + pathname) return

      client.postMessage({
        action: 'pushRoute',
        data: {
          route: {
            pathname
          }
        }
      })


    })

  )

  event.notification.close()

})
