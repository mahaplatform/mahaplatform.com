import _ from 'lodash'

export const INITIAL_STATE = {
  strategy: null,
  category: null,
  classification: null,
  competency: null,
  review: false,
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
        ...state.selected.filter(resource => resource.id !== action.id)
      ] : [
        ...state.selected,
        action.id
      ]
    }

  case 'TOGGLE_REVIEW':
    return {
      ...state,
      review: !state.review
    }

  default:
    return state

  }

}

export default reducer
