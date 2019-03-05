const INITIAL_STATE = {
  assets: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      assets: action.result.data
    }

  case 'SET':
    return {
      ...state,
      assets: action.assets
    }

  default:
    return state
  }

}

export default reducer
