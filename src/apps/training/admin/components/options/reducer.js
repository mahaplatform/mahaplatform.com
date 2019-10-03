const INITIAL_STATE = {
  trainings: [],
  options: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      options: [
        ...state.options,
        { training_ids: action.ids }
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
      status: 'loaded',
      trainings: action.result.data
    }

  case 'REMOVE':
    return {
      ...state,
      options: [
        ...state.options.filter((option, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
