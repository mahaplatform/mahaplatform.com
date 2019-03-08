import _ from 'lodash'

export const INITIAL_STATE = {
  category: null,
  competency: null,
  selected: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      [action.key]: action.value
    }

  case 'TOGGLE':
    return {
      ...state,
      selected: _.includes(state.selected, action.id) ? [
        ...state.selected.filter(id => id !== action.id)
      ] : [
        ...state.selected,
        action.id
      ]
    }

  default:
    return state

  }

}

export default reducer
