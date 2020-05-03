importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-app.js')

importScripts('https://www.gstatic.com/firebasejs/7.14.2/firebase-messaging.js')

function getParameterByName(key) {
  var url = location.href
  var regex = new RegExp('[?&]' + key + '(=([^&#]*)|&|#|$)')
  var results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, ' '))
}

const host = getParameterByName('host')

const project_id = getParameterByName('projectId')

self.firebase.initializeApp({
  apiKey: getParameterByName('apiKey'),
  authDomain: `${project_id}.firebaseapp.com`,
  databaseURL: `https://${project_id}.firebaseio.com`,
  projectId: getParameterByName('projectId'),
  storageBucket: `${project_id}.appspot.com`,
  messagingSenderId: getParameterByName('messagingSenderId'),
  appId: getParameterByName('appId')
})

const messaging = self.firebase.messaging()

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

    self.clients.matchAll({
      includeUncontrolled: true,
      type: 'window'
    }).then(clientList => {

      const client = clientList.find(client => {
        const url = new URL(client.url)
        return url.host === host && 'focus' in client && 'postMessage' in client
      })

      if(!client) return self.clients.openWindow(host + pathname)

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
