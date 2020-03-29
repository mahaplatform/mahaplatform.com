import _ from 'lodash'

export const INITIAL_STATE = {
  online: null,
  channels: {},
  handlers: [],
  listeners: {},
  revision: null,
  reload: false,
  status: null,
  text: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_EVENT_LISTENER':
    return {
      ...state,
      listeners: {
        ...state.listeners,
        [action.event]: [
          ...state.listeners[action.event] || [],
          action.handler
        ]
      }
    }

  case 'REMOVE_EVENT_LISTENER':
    return {
      ...state,
      listeners: {
        ...state.listeners,
        [action.event]: [
          ...state.listeners[action.event].filter(handler => _.isEqual(handler, action.handler))
        ]
      }
    }

  case 'CONNECT':
    return {
      ...state,
      online: true
    }

  case 'DISCONNECT':
    return {
      ...state,
      online: false,
      channels: Object.keys(state.channels).reduce((channels, channel) => ({
        ...channels,
        [channel]: false
      }), {})
    }

  case 'JOINED':
    return {
      ...state,
      channels: {
        ...state.channels,
        ...action.channels.reduce((channels, channel) => ({
          ...channels,
          [channel]: true
        }), {})
      }
    }

  case 'LEFT':
    return {
      ...state,
      channels: {
        ...Object.keys(state.channels).reduce((channels, channel) => {
          if(_.includes(action.channels, channel)) return channels
          return {
            ...channels,
            [channel]: state.channels[channel]
          }
        }, {})
      }
    }

  case 'SUBSCRIBE':
    return {
      ...state,
      handlers: [
        ...state.handlers,
        ...action.handlers
      ]
    }

  case 'UNSUBSCRIBE':
    return {
      ...state,
      handlers: [
        ...state.handlers.filter(handler => {
          return _.find(action.handler, handler) === undefined
        })
      ]
    }

  case 'SET_ALERT':
    return {
      ...state,
      status: action.status,
      text: action.text
    }

  case 'SET_REVISION':
    return {
      ...state,
      revision: action.revision,
      reload: action.reload
    }

  case 'CLEAR_ALERT':
    return {
      ...state,
      status: null,
      text: null
    }

  default:
    return state
  }

}
