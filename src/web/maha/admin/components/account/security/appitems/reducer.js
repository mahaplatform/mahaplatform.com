import _ from 'lodash'

export const INITIAL_STATE = {
  selected: [],
  items: [],
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      selected: action.selected
    }

  case 'LOAD_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'LOAD_SUCCESS':
    return {
      ...state,
      items: action.result.data,
      status: 'success'
    }

  case 'TOGGLE':
    return {
      ...state,
      selected: _.includes(state.selected, action.id) ? state.selected.filter(id => id !== action.id) : [
        ...state.selected,
        action.id
      ]
    }

  default:
    return state
  }

}
