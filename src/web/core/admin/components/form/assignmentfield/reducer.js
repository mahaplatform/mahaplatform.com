const INITIAL_STATE = {
  assignments: [],
  q: '',
  status: 'pending',
  unassigned: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      assignments: [
        ...state.assignments,
        action.assignee
      ]
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      unassigned: action.result.data,
      status: 'ready'
    }

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'REMOVE':
    return {
      ...state,
      assignments: [
        ...state.assignments.filter((assignee, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
