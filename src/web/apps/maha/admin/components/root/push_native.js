const pushElectron = () => {

  const sendMessage = (action, data) => {
    window.parent.postMessage({
      action,
      data
    }, '*')
  }

  const receiveMessage = (store, namespace) => e => {

    if(e.origin !== 'file://') return

    const message = e.data

    if(message.action === 'loadPermission') {

      store.dispatch({
        type: withNamespace(namespace, 'PUSH_LOAD_PERMISSION_SUCCESS'),
        permission: message.data.permission
      })

    } else if(message.action === 'requestPermission') {

      store.dispatch({
        type: withNamespace(namespace, 'PUSH_REQUEST_PERMISSION_SUCCESS'),
        permission: message.data.permission
      })

    } else if(message.action === 'getToken') {

      store.dispatch({
        type: withNamespace(namespace, 'PUSH_GET_TOKEN_SUCCESS'),
        token: message.data.token
      })

    } else if(message.action === 'pushRoute') {

      store.dispatch({
        type: withNamespace(namespace, 'PUSH_PUSH_ROUTE'),
        route: message.data.route
      })

    }
  }

  return store => next => action => {

    const [,namespace,type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

    if(type === 'PUSH_REGISTER_WORKER') {

      window.addEventListener('message', receiveMessage(store, namespace), false)

      store.dispatch({
        type: withNamespace(namespace, 'PUSH_REGISTER_WORKER_SUCCESS')
      })

    } else if(type === 'PUSH_LOAD_PERMISSION') {

      sendMessage('loadPermission')

    } else if(type === 'PUSH_REQUEST_PERMISSION') {

      sendMessage('requestPermission')

    } else if(type === 'PUSH_GET_TOKEN') {

      sendMessage('getToken')

    } else {

      next(action)

    }

  }

}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default pushElectron
