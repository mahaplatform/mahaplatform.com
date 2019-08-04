import { create, remove, update } from './utils'

const INITIAL_STATE = {
  panel: null,
  criteria: { $and: [] }
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      panel: {
        mode: 'new',
        cindex: action.cindex
      }
    }

  case 'CANCEL':
    return {
      ...state,
      panel: null
    }

  case 'CREATE':
    return {
      ...state,
      criteria: create(state.criteria, action.cindex, action.value),
      panel: null
    }

  case 'EDIT':
    return {
      ...state,
      panel: {
        mode: 'edit',
        cindex: action.cindex,
        criterion: action.criterion
      }
    }

  case 'REMOVE':
    return {
      ...state,
      criteria: remove(state.criteria, action.cindex)
    }

  case 'UPDATE':
    return {
      ...state,
      criteria: update(state.criteria, action.cindex, action.value),
      panel: null
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
