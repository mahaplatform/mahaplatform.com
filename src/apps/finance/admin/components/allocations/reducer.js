const INITIAL_STATE = {
  expense_types: {
    records: [],
    status: 'pending'
  },
  allocations: [],
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
      allocations: [
        ...state.allocations,
        action.allocation
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
      allocations: [
        ...state.allocations.filter((allocation, index) => {
          return index !== action.index
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      allocations: action.allocations
    }

  case 'UPDATE':
    return {
      ...state,
      allocations: [
        ...state.allocations.map((allocation, index) => {
          return (index === action.index) ? action.allocation : allocation
        })
      ]
    }
  default:
    return state
  }

}

export default reducer
