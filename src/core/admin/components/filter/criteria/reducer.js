import { create, remove, update } from './utils'

const INITIAL_STATE = {
  filter: null,
  criteria: null,
  test: null
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

  case 'RESET':
    return {
      ...state,
      criteria: { $and: [] }
    }

  case 'SET':
    return {
      ...state,
      filter: action.filter,
      criteria: action.criteria
    }

  case 'TEST':
    return {
      ...state,
      test: action.mode === 'add' ?
        create(state.criteria, action.cindex, action.value) :
        update(state.criteria, action.cindex, action.value)
    }

  case 'UPDATE':
    return {
      ...state,
      criteria: update(state.criteria, action.cindex, action.value)
    }

  default:
    return state
  }

}

export default reducer
