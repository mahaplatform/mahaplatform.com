const INITIAL_STATE = {
  images: [],
  status: 'pending'
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

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'ready',
      images: [
        ...state.images.map(image => ({
          ...image,
          asset: action.result.data.find(asset => {
            return asset.id === image.asset.id
          })
        }))
      ]
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

  case 'SET':
    return {
      ...state,
      images: action.images,
      status: action.images.length > 0 ? 'initialized' : 'ready'
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
