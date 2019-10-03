const INITIAL_STATE = {
  config: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      config: action.result.data.config,
      status: 'success'
    }

  case 'UPDATE':
    return {
      ...state,
      config: action.config
    }

  default:
    return state
  }

}

export default reducer
