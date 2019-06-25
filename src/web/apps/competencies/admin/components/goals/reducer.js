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
      selected: _.find(state.selected, { id: action.resource.id }) ? [
        ...state.selected.filter(resource => resource.id !== action.resource.id)
      ] : [
        ...state.selected,
        action.resource
      ]
    }

  case 'TOGGLE_REVIEW':
    return {
      ...state,
      review: !state.review
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saved'
    }

  default:
    return state

  }

}

export default reducer
