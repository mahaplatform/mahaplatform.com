import _ from 'lodash'

export const INITIAL_STATE = {
  panels: [],
  results: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      results: action.results
    }

  case 'CHANGE':
    return {
      ...state,
      results: action.value ? {
        ...state.results,
        [action.name]: action.value
      } : _.omit(state.results, action.name)
    }

  case 'ADD_PANEL':
    return {
      ...state,
      panels: [
        ...state.panels,
        action.panel
      ]
    }

  case 'REMOVE_PANEL':
    return {
      ...state,
      panels: state.panels.slice(0, state.panels - 1)
    }

  case 'RESET':
    return {
      ...state,
      results: INITIAL_STATE.results
    }

  default:
    return state

  }
}

export default reducer
