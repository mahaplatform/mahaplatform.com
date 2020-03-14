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
      status: 'success',
      asset: action.result.data
    }

  case 'REMOVE':
    return {
      ...state,
      status: 'pending',
      asset: null
    }

  case 'SET':
    return {
      ...state,
      status: 'success',
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

  default:
    return state
  }

}

export default reducer
