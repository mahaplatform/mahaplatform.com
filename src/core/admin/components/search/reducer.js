import _ from 'lodash'

const INITIAL_STATE = {
  q: '',
  selected: null
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
        ...action.multiple ?
          _.xor(state.selected, [action.value]) :
          !_.includes(state.selected, action.value) ? [action.value] : []
      ]
    }

  default:
    return state
  }

}

export default reducer
