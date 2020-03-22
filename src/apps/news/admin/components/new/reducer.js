const INITIAL_STATE = {
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

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

  default:
    return state
  }

}

export default reducer
