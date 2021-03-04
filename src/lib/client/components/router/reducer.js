export const INITIAL_STATE = {
  action: null,
  history: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'PUSH':
    return {
      ...state,
      action: 'PUSH',
      history: [
        ...state.history,
        action.route
      ]
    }

  case 'POP':
    return {
      ...state,
      action: 'POP',
      history: [
        ...state.history.slice(0, -1)
      ]
    }

  case 'REPLACE':
    return {
      ...state,
      action: 'REPLACE',
      history: [
        ...state.history.map((route, index) => {
          return (index === state.history.length - 1) ? action.route : route
        })
      ]
    }

  default:
    return state
  }

}
