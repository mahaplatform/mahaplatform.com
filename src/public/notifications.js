importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-app.js')

importScripts('https://www.gstatic.com/firebasejs/8.2.10/firebase-messaging.js')

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

messaging.onBackgroundMessage((payload) => {
  const { body, data, title } = payload.data
  self.registration.showNotification(title, {
    body,
    data
  })
})

self.addEventListener('notificationclick', event => {

  const data = JSON.parse(event.notification.data)

  event.waitUntil(
    self.clients.matchAll({
      includeUncontrolled: true,
      type: 'window'
    }).then(clientList => {
      console.log(host + data.route)
      self.clients.openWindow(host + data.route)
    })
  )

  event.notification.close()

})
