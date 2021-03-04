const INITIAL_VALUE = {
  chosen: null,
  status: 'ready'
}

export default (state = INITIAL_VALUE, action) => {

  switch (action.type) {

  case 'CLEAR':
    return {
      ...state,
      chosen: null
    }

  case 'CHOOSE':
    return {
      ...state,
      chosen: action.chosen
    }

  case 'LOAD_SUCCESS':
    return {
      ...state,
      chosen: action.result.data[0],
      status: 'success'
    }

  default:
    return state

  }

}
