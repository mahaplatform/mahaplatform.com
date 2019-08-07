import { create, remove, update } from './utils'

const INITIAL_STATE = {
  criteria: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CREATE':
    return {
      ...state,
      criteria: create(state.criteria, action.cindex, action.value)
    }

  case 'REMOVE':
    return {
      ...state,
      criteria: remove(state.criteria, action.cindex)
    }

  case 'UPDATE':
    return {
      ...state,
      criteria: update(state.criteria, action.cindex, action.value)
    }

  case 'SET':
    return {
      ...state,
      criteria: action.criteria
    }

  default:
    return state
  }

}

export default reducer
