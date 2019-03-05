export const INITIAL_STATE = {
  verison: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_VERSION':
    return {
      ...state,
      verison: action.version
    }

  default:
    return state
  }

}
