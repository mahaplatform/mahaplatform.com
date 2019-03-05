export const INITIAL_STATE = {
  active: null,
  app: null,
  mode: 'apps',
  path: [],
  route: null,
  state: 'slide-next'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TOGGLE_MODE':
    return {
      ...state,
      mode: (state.mode === 'apps') ? 'teams' : 'apps'
    }

  case 'FORWARD':
    return {
      ...state,
      state: 'slide-next',
      path: [
        ...state.path,
        action.index
      ]
    }

  case 'BACK':
    return {
      ...state,
      state: 'slide-back',
      path: [
        ...state.path.slice(0, state.path.length - 1)
      ]
    }

  default:
    return state
  }
}
