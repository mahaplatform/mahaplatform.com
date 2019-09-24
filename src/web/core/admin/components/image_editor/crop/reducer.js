const INITIAL_STATE = {
  origin: null,
  drift: { x: 0, y: 0 },
  zoom: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'MOVE':
    return {
      ...state,
      drift: action.drift
    }

  case 'MOVING':
    return {
      ...state,
      origin: action.origin
    }

  case 'ZOOM':
    return {
      ...state,
      zoom: action.zoom
    }

  default:
    return state
  }

}

export default reducer
