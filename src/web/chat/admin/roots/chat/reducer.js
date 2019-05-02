import moment from 'moment'
import _ from 'lodash'

export const INITIAL_STATE = {
  active: [],
  channels: [],
  channels_status: 'pending',
  typing: [],
  unread: {},
  unread_status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_CHANNELS_REQUEST':
    return {
      ...state,
      channels_status: 'loading'
    }

  case 'FETCH_CHANNELS_FAILURE':
    return {
      ...state,
      channels_status: 'failed'
    }

  case 'FETCH_CHANNELS_SUCCESS':
    return {
      ...state,
      channels: action.result.data,
      channels_status: 'success'
    }

  case 'FETCH_UNREAD_REQUEST':
    return {
      ...state,
      unread_status: 'pending'
    }

  case 'FETCH_UNREAD_FAILURE':
    return {
      ...state,
      unread_status: 'failed'
    }

  case 'FETCH_UNREAD_SUCCESS':
    return {
      ...state,
      unread: action.result.data,
      unread_status: 'success'
    }

  case 'ACTIVATE_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels.map(channel => ({
          ...channel,
          is_archived: (channel.id === action.channel_id) ? false : channel.is_archived
        }))
      ]
    }

  case 'ARCHIVE_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels.map(channel => ({
          ...channel,
          is_archived: (channel.id === action.channel_id) ? true : channel.is_archived
        }))
      ]
    }

  case 'APPEAR':
    const active = {
      channel_id: action.channel_id,
      user_id: action.user_id
    }
    return {
      ...state,
      active: [
        ...state.active.filter(active => active.user_id !== action.user_id),
        ..._.find(state.active, active) ? [] : [active]
      ]
    }

  case 'ADD_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels,
        action.channel
      ]
    }

  case 'ADD_TYPING':
    const typing =  {
      channel_id: action.channel_id,
      user_id: action.user_id,
      full_name: action.full_name
    }
    return {
      ...state,
      typing: [
        ...state.typing.filter(typing => typing.user_id !== action.user_id),
        ..._.find(state.typing, typing) ? [] : [typing]
      ]
    }

  case 'DISAPPEAR':
    return {
      ...state,
      active: [
        ...state.active.filter(typing => {
          return !(typing.channel_id === action.channel_id && typing.user_id === action.user_id)
        })
      ]
    }

  case 'REMOVE_TYPING':
    return {
      ...state,
      typing: [
        ...state.typing.filter(typing => {
          return !(typing.channel_id === action.channel_id && typing.user_id === action.user_id)
        })
      ]
    }

  case 'ADD_MESSAGE':
    return {
      ...state,
      channels: state.channels.map(channel => {
        if(channel.id !== action.message.channel_id) return channel
        return {
          ...channel,
          last_message_at: action.message.created_at,
          last_message: action.message,
          subscriptions: [
            ...channel.subscriptions.map(user => {
              if(user.id !== action.message.user.id) return user
              return {
                ...user,
                last_message: {
                  id: action.message.id,
                  last_viewed_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z'
                }
              }
            })
          ]
        }
      })
    }

  case 'REMOVE_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels.filter(channel => {
          return channel.id !== action.channel_id
        })
      ]
    }

  case 'UPDATE_CHANNEL':
    return {
      ...state,
      channels: [
        ...state.channels.map(channel => {
          return channel.id !== action.channel.id ? channel : action.channel
        })
      ]
    }

  case 'UPDATE_READ':
    return {
      ...state,
      channels: [
        ...state.channels.map(channel => {
          if(channel.id !== action.channel_id) return channel
          return {
            ...channel,
            subscriptions: [
              ...channel.subscriptions.map(user => {
                if(user.id !== action.reader_id) return user
                return {
                  ...user,
                  last_message: {
                    id: action.message.id,
                    viewed_at: action.message.viewed_at
                  }
                }
              })
            ]
          }
        })
      ],
      unread: {
        ...state.unread,
        [action.channel_id]: action.user_id === action.reader_id ? 0 : state.unread[action.channel_id]
      }
    }

  case 'UPDATE_UNREAD':
    return {
      ...state,
      unread: action.unread
    }

  default:
    return state

  }

}

export default reducer
