import _ from 'lodash'

export const INITIAL_STATE = {
  status: 'pending',
  roles: [],
  assigned: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_ASSIGNED':
    return {
      ...state,
      assigned: action.assigned
    }

  case 'LOAD_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_SUCCESS':
    return {
      ...state,
      roles: action.result.data,
      status: 'success'
    }

  case 'LOAD_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'TOGGLE':
    return {
      ...state,
      assigned: _.includes(state.assigned, state.roles[action.index].id) ? _.without(state.assigned, state.roles[action.index].id) : [...state.assigned, state.roles[action.index].id]
    }

  default:
    return state

  }

}
