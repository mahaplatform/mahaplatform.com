const INITIAL_STATE = {
  asset: null,
  number: null,
  code: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CALL_SUCCESS':
    return {
      ...state,
      code: action.result.data.code
    }

  case 'SET':
    return {
      ...state,
      asset: action.asset
    }

  case 'UPDATE_NUMBER':
    return {
      ...state,
      number: action.number
    }

  default:
    return state
  }

}

export default reducer
