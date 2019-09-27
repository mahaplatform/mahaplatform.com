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

  case 'REMOVE':
    return {
      ...state,
      images: [
        ...state.images.filter((image, index) => {
          return index !== action.index
        })
      ]
    }

  case 'UPDATE':
    return {
      ...state,
      images: [
        ...state.images.map((image, index) => {
          if(index !== action.index) return image
          return {
            ...image,
            transforms: action.transforms
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
