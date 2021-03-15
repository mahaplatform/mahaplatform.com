import firebase from 'firebase/app'
import 'firebase/messaging'
import qs from 'qs'

const pushBrowser = () => {

  if(!firebase.messaging.isSupported()) return store => next => action => next(action)

  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    projectId: process.env.FIREBASE_PROJECT_ID,
    messagingSenderId: process.env.FIREBASE_MESSAGE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    host: process.env.ADMIN_HOST
  }

  const serviceWorkerFile = `/notifications.js?${qs.stringify(firebaseConfig)}`

  firebase.initializeApp(firebaseConfig)

  const messaging = firebase.messaging()

  messaging.usePublicVapidKey(process.env.FIREBASE_WEB_PUSH_PUBLIC_KEY)

  return store => next => action => {

    const [,namespace,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

    if(type === 'PUSH_REGISTER_WORKER') {

      navigator.serviceWorker.register(serviceWorkerFile).then(registration => {

        messaging.useServiceWorker(registration)

        messaging.onTokenRefresh(token => store.dispatch({
          type: withNamespace(namespace, 'PUSH_SET_TOKEN'),
          token
        }))

        store.dispatch({
          type: withNamespace(namespace, 'PUSH_REGISTER_WORKER_SUCCESS')
        })

      }).catch(error => {

        store.dispatch({
          type: withNamespace(namespace, 'PUSH_REGISTER_WORKER_FAILURE'),
          error
        })

      })

    } else if(type === 'PUSH_LOAD_PERMISSION') {

      store.dispatch({
        type: withNamespace(namespace, 'PUSH_LOAD_PERMISSION_SUCCESS'),
        permission: window.Notification.permission
      })

    } else if(type === 'PUSH_REQUEST_PERMISSION') {

      messaging.requestPermission().then((permission) => {

        return store.dispatch({
          type: withNamespace(namespace, 'PUSH_REQUEST_PERMISSION_SUCCESS'),
          permission: 'granted'
        })

      }).catch((err) => {

        store.dispatch({
          type: withNamespace(namespace, 'PUSH_REQUEST_PERMISSION_SUCCESS'),
          permission: 'denied'
        })

      })

    } else if(type === 'PUSH_GET_TOKEN') {

      messaging.getToken().then((token) => {

        if(!token) return

        return store.dispatch({
          type: withNamespace(namespace, 'PUSH_GET_TOKEN_SUCCESS'),
          token
        })

      }).catch((err) => {

        store.dispatch({
          type: withNamespace(namespace, 'PUSH_GET_TOKEN_FAILURE'),
          err
        })

      })

    } else {

      next(action)

    }

  }

}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default pushBrowser
