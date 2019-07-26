const INITIAL_STATE = {
  expense_types: {
    records: [],
    status: 'pending'
  },
  line_items: [],
  projects: {
    records: [],
    status: 'pending'
  }
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      line_items: [
        ...state.line_items,
        action.line_item
      ]
    }

  case 'FETCH_EXPENSE_TYPES_SUCCESS':
    return {
      ...state,
      expense_types: {
        records: action.result.data,
        status: 'success'
      }
    }

  case 'FETCH_PROJECTS_SUCCESS':
    return {
      ...state,
      projects: {
        records: action.result.data,
        status: 'success'
      }
    }

  case 'REMOVE':
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
      line_items: action.line_items
    }

  case 'UPDATE':
    return {
      ...state,
      line_items: [
        ...state.line_items.map((line_item, index) => {
          return (index === action.index) ? action.line_item : line_item
        })
      ]
    }
  default:
    return state
  }

}

export default reducer
