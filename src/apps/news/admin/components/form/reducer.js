const INITIAL_STATE = {
  status: 'pending',
  text: '',
  attachments: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      text: action.text
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'pending',
      text: ''
    }

  case 'ADD_ATTACHMENTS':
    return {
      ...state,
      attachments: [
        ...state.attachments,
        ...action.attachments      
      ]
    }

  case 'REMOVE_ATTACHMENT':
    return {
      ...state,
      attachments: [
        ...state.attachments.filter((attachment, index) => index !== action.index)
      ]
    }

  default:
    return state
  }

}

export default reducer
