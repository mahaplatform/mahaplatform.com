import _ from 'lodash'

export const INITIAL_STATE = {
  query: '',
  chosen: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_SUCCESS':
    return {
      ...state,
      chosen: action.result.data
    }

  case 'SET_CHOSEN':
    return {
      ...state,
      chosen: action.chosen
    }

  case 'SET_QUERY':
    return {
      ...state,
      query: action.query
    }

  case 'TOGGLE_RECORD':
    return {
      ...state,
      chosen: _.xorWith(state.chosen, [action.record], _.isEqual)
    }

  default:
    return state
  }

}

export default reducer
