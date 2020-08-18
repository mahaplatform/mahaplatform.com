export const INITIAL_STATE = {
  cart: null,
  status: 'pending',
  error: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      error: action.result.message,
      status: 'failed'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      cart: action.result.data,
      status: 'success'
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      error: action.result.message,
      status: 'failed'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      cart: action.result.data,
      status: 'saved'
    }

  default:
    return state

  }

}

export default reducer
