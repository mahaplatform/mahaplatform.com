const INITIAL_STATE = {
  responsibility_types: [],
  status: 'pending',
  responsibilities: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      responsibilities: [
        ...state.responsibilities,
        action.responsibility
      ]
    }

  case 'FETCH_TYPES_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_TYPES_SUCCESS':
    return {
      ...state,
      responsibility_types: action.result.data,
      status: 'ready'
    }

  case 'REMOVE':
    return {
      ...state,
      responsibilities: [
        ...state.responsibilities.filter((responsibility, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
