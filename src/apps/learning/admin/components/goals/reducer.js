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

  case 'ADD':
    return {
      ...state,
      strategy: null,
      selected: [
        ...state.selected,
        action.goal
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      selected: [
        ...state.selected.filter((item, index) => {
          return index !== action.index
        })
      ]
    }

  case 'UPDATE':
    return {
      ...state,
      selected: [
        ...state.selected.map((item, index) => {
          if(index !== action.index) return item
          return {
            ...item,
            description: action.description
          }
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      [action.key]: action.value
    }

  case 'TOGGLE':
    return {
      ...state,
      selected: [
        ..._.xorBy(state.selected, [action.resource], (item) => item.id)
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
