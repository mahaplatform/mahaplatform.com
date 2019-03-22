const INITIAL_STATE = {
  status: 'pending',
  fields: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'success',
      fields: action.result.data
    }

  case 'MOVE':
    return {
      ...state,
      fields: (action.from < action.to) ? [
        ...state.fields.slice(0, action.from),
        ...state.fields.slice(action.from + 1, action.to + 1),
        state.fields[action.from],
        ...state.fields.slice(action.to + 1)
      ] : [
        ...state.fields.slice(0, action.to),
        state.fields[action.from],
        ...state.fields.slice(action.to, action.from),
        ...state.fields.slice(action.from + 1)
      ]
    }

  default:
    return state
  }

}

export default reducer
