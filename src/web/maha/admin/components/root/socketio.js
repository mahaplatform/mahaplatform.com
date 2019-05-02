import SocketClient from 'socket.io-client'
import _ from 'lodash'

const ACTION_TYPES = [
  'SOCKETIO_INIT',
  'SOCKETIO_JOIN',
  'SOCKETIO_LEAVE',
  'SOCKETIO_EMIT'
]

const socketioMiddleware = (options = {}) => {

  const client = createClient(options)

  return store => next => action => {

    const [, namespace, type] = action.type.match(/([a-z0-9_.]*)?\/?([A-Z0-9_]*)/)

    if(!_.includes(ACTION_TYPES, type)) return next(action)

    if(type === 'SOCKETIO_INIT') {

      client.on('connect', () => action.handler('connect'))

      client.on('disconnect', () => action.handler('disconnect'))

      client.onevent = (packet) => action.handler(packet.data[0], packet.data[1])

    } else if(type === 'SOCKETIO_JOIN') {

      store.dispatch({
        type: withNamespace(namespace, 'JOIN'),
        channels: action.channels
      })

      client.emit('join', action.token, action.channels)

    } else if(type === 'SOCKETIO_LEAVE') {

      store.dispatch({
        type: withNamespace(namespace, 'LEAVE'),
        channels: action.channels
      })

      client.emit('leave', action.token, action.channels)

    } else if(type === 'SOCKETIO_EMIT') {

      store.dispatch({
        type: withNamespace(namespace, action.request),
        ...action.data
      })

      client.emit(action.verb, action.token, action.channel, action.data)

    } else {

      return next(action)

    }

  }

}

const createClient = (options) => {

  const socketUrl = options.url || `${options.protocol}//${options.hostname}:${options.port}`

  return options.client || SocketClient(socketUrl)

}

const withNamespace = (namespace, type) => {
  return namespace ? `${namespace}/${type}` : type
}

export default socketioMiddleware
