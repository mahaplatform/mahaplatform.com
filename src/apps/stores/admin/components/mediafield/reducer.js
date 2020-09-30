const INITIAL_STATE = {
  images: null,
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
      ].map((image, index) => ({
        ...image,
        delta: index
      }))
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

  case 'MOVE':
    return {
      ...state,
      images: ((action.from < action.to) ? [
        ...state.images.slice(0, action.from),
        ...state.images.slice(action.from + 1, action.to + 1),
        state.images[action.from],
        ...state.images.slice(action.to + 1)
      ] : [
        ...state.images.slice(0, action.to),
        state.images[action.from],
        ...state.images.slice(action.to, action.from),
        ...state.images.slice(action.from + 1)
      ]).map((question, index) => ({
        ...question,
        delta: index
      }))
    }

  case 'REMOVE':
    return {
      ...state,
      images: [
        ...state.images.filter((image, index) => {
          return index !== action.index
        }).map((image, index) => ({
          ...image,
          delta: index
        }))
      ]
    }

  case 'SET':
    return {
      ...state,
      images: action.images,
      status: action.images.length > 0 ? 'initialized' : 'ready'
    }

  default:
    return state
  }

}

export default reducer
