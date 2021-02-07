const INITIAL_STATE = {
  asset: null,
  number: null,
  status: 'pending',
  code: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CALL_REQUEST':
    return {
      ...state,
      status: 'calling'
    }

  case 'CALL_SUCCESS':
    return {
      ...state,
      code: action.result.data.code
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'pending',
      asset: action.result.data
    }

  case 'SET':
    return {
      ...state,
      status: 'pending',
      asset: action.asset
    }

  case 'SET_STATUS':
    return {
      ...state,
      status: action.status
    }

  case 'UPDATE_NUMBER':
    return {
      ...state,
      number: action.number
    }

  case 'CLEAR':
    return {
      ...state,
      asset: null,
      number: null,
      status: 'pending',
      code: null
    }

  default:
    return state
  }

}

export default reducer
