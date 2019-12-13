const INITIAL_STATE = {
  invoice: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      invoice: action.result.data
    }

  default:
    return state
  }

}

export default reducer
