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
        {
          id: null,
          ...action.responsibility,
          rating: null,
          comments: ''
        }

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

  case 'SET':
    return {
      ...state,
      responsibilities: action.responsibilities
    }

  case 'UPDATE':
    return {
      ...state,
      responsibilities: [
        ...state.responsibilities.map((responsibility, index) => {
          if(index !== action.index) return responsibility
          return {
            ...responsibility,
            [action.key]: action.value
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
