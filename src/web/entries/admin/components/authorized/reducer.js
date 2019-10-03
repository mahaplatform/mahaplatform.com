export const INITIAL_STATE = {
  connected: null,
  url: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHECK_SUCCESS':
    return {
      ...state,
      connected: action.result.data === true
    }

  case 'AUTHORIZE_SUCCESS':
    return {
      ...state,
      url: action.result.data
    }

  case 'AUTHORIZED':
    return {
      ...state,
      connected: true
    }

  default:
    return state

  }

}

export default reducer
