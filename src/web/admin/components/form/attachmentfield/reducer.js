const INITIAL_STATE = {
  assets: [],
  status: 'pending'
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
      status: 'failed',
      error: action.result.error
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'success',
      assets: action.result.data
    }

  case 'SET':
    return {
      ...state,
      assets: action.assets
    }

  case 'REMOVE':
    return {
      ...state,
      assets: [
        ...state.assets.filter((asset, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
