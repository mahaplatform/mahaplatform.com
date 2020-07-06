const INITIAL_STATE = {
  line_items: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_LINE_ITEM':
    return {
      ...state,
      line_items: [
        ...state.line_items,
        action.line_item
      ]
    }

  case 'REMOVE_LINE_ITEM':
    return {
      ...state,
      line_items: [
        ...state.line_items.filter((line_item, index) => {
          return index !== action.index
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      ...action.details
    }

  default:
    return state
  }

}

export default reducer
