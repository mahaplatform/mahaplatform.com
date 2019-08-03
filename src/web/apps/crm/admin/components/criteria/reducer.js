import { add, remove, update } from './utils'

const INITIAL_STATE = {
  active: false,
  adding: false,
  criteria: { $and: [
    { $or: [
      { first_name: { $eq: 'Greg' } },
      { last_name: { $eq: 'Kops' } }
    ] },
    { first_name: { $eq: 'Greg' } },
    { last_name: { $eq: 'Kops' } }
  ]},
  contacts: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      criteria: add(state.criteria, action.cindex, action.value)
    }

  case 'BEGIN':
    return {
      ...state,
      active: true
    }

  case 'CLEAR':
    return {
      ...state,
      criteria: null
    }

  case 'END':
    return {
      ...state,
      active: false
    }

  case 'SET':
    return {
      ...state,
      criteria: action.criteria
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

  default:
    return state
  }

}

export default reducer
