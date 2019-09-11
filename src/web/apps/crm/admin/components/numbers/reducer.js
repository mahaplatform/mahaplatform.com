const INITIAL_STATE = {
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

  default:
    return state
  }

}

export default reducer
