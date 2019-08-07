import _ from 'lodash'

const INITIAL_STATE = {
  q: '',
  selected: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'SET':
    return {
      ...state,
      selected: action.selected
    }

  case 'TOGGLE':
    return {
      ...state,
      selected: [
        ..._.xor(state.selected, [action.value])
      ]
    }

  default:
    return state
  }

}

export default reducer
