const INITIAL_STATE = {
  chosen: null,
  numbers: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOOKUP_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOOKUP_SUCCESS':
    return {
      ...state,
      numbers: action.result.data,
      status: 'success'
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saved'
    }

  case 'CHOOSE':
    return {
      ...state,
      chosen: action.index
    }

  case 'CLEAR':
    return {
      ...state,
      chosen: null
    }

  default:
    return state
  }

}

export default reducer
