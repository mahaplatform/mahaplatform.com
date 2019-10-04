const INITIAL_STATE = {
  deviceIndex: 0,
  orientationIndex: 0,
  scaleIndex: 2
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_VIEWPORT':
    return {
      ...state,
      [`${action.key}Index`]: action.value
    }

  default:
    return state
  }

}

export default reducer
