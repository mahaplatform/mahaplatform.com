const INITIAL_STATE = {
  images: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      images: action.images
    }

  default:
    return state
  }

}

export default reducer
