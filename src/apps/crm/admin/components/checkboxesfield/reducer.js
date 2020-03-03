import _ from 'lodash'

const INITIAL_STATE = {
  items: [],
  selected: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      items: action.result.data,
      status: 'ready'
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
        ..._.xorWith(state.selected, [action.item], _.isEqual)
      ]
    }

  default:
    return state
  }

}

export default reducer
