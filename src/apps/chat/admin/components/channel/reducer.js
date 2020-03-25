import _ from 'lodash'

export const INITIAL_STATE = {
  saving: null,
  attachments: [],
  messages: [],
  quoted_message_id: null,
  signpost: false,
  status: 'pending',
  text: '',
  total: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_ALL_REQUEST':
    return {
      ...state,
      status: state.status === 'pending' ? 'loading' : 'appending'
    }

  case 'FETCH_ALL_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'FETCH_ALL_SUCCESS':
    return {
      ...state,
      total: action.result.pagination.total,
      messages: [
        ...state.messages,
        ...action.result.data
      ],
      status: 'success'
    }

  case 'CREATE_REQUEST':
    return {
      ...state,
      attachments: [],
      link: null,
      quoted_message_id: null,
      saving: {
        attachments: state.attachments,
        link: state.link,
        quoted_message_id: state.quoted_message_id,
        text: state.text
      },
      status: 'sending',
      text: ''
    }

  case 'CREATE_FAILURE':
    return {
      ...state,
      messages: [
        ...state.messages.filter(message => message.code !== action.message.code)
      ],
      ...state.saving,
      saving: null
    }

  case 'CREATE_SUCCESS':
    return {
      ...state,
      messages: [
        ...state.messages.map(message => {
          return (message.code === action.result.data.code) ? action.result.data : message
        })
      ],
      status: 'success',
      saving: null
    }

  case 'TYPE':
    return {
      ...state,
      text: action.text
    }

  case 'ADD_MESSAGE':
    return {
      ...state,
      messages: _.find(state.messages, { code: action.message.code }) ? [
        ...state.messages.map(message => {
          return message.code === action.message.code ? action.message : message
        })
      ] : [
        action.message,
        ...state.messages
      ]
    }

  case 'REMOVE_MESSAGE':
    return {
      ...state,
      messages: [
        ...state.messages.filter(message => message.code !== action.code)
      ]
    }

  case 'ADD_ATTACHMENTS':
    return {
      ...state,
      attachments: [
        ...state.attachments,
        ...action.attachments
      ]
    }

  case 'UPDATE_ATTACHMENT':
    return {
      ...state,
      attachments: [
        ...state.attachments.map(attachment => {
          if(attachment.asset.identifier !== action.identifier) return attachment
          return {
            ...attachment,
            ...action.attachment,
            asset: {
              ...attachment.asset,
              ...action.attachment.asset || {}
            }
          }
        })
      ]
    }

  case 'REMOVE_ATTACHMENT':
    return {
      ...state,
      attachments: [
        ...state.attachments.filter((attachment, index) => index !== action.index)
      ]
    }

  case 'REMOVE_ATTACHMENTS':
    return {
      ...state,
      attachments: []
    }

  case 'SHOW_SIGNPOST':
    return {
      ...state,
      signpost: action.show
    }

  case 'ADD_QUOTED_MESSAGE':
    return {
      ...state,
      quoted_message_id: action.id
    }

  case 'REMOVE_QUOTED_MESSAGE':
    return {
      ...state,
      quoted_message_id: null
    }

  default:
    return state

  }

}

export default reducer
