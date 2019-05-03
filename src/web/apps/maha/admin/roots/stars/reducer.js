export const INITIAL_STATE = {
  stars: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'UPDATE':
    return {
      ...state,
      stars: {
        ...state.stars,
        [action.table]: {
          ...state.stars[action.table],
          [action.id]: action.starred
        }
      }
    }

  case 'STAR':
    return {
      ...state,
      stars: {
        ...state.stars,
        [action.table]: {
          ...state.stars[action.table] || {},
          [action.id]: true
        }
      }
    }

  case 'UNSTAR':
    return {
      ...state,
      stars: {
        ...state.stars,
        [action.table]: {
          ...state.stars[action.table] || {},
          [action.id]: false
        }
      }
    }

  default:
    return state

  }

}

export default reducer
