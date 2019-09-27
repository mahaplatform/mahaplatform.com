const INITIAL_STATE = {
  images: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      images: [
        ...state.images,
        ...action.images
      ]
    }

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
