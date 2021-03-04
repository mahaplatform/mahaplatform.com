export const INITIAL_STATE = {
  index: 0,
  status: 'loading',
  import: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'INIT':
    return {
      ...state,
      import: action.import
    }

  case 'PREVIOUS':
    return {
      ...state,
      index: state.index > 0 ? state.index - 1 : 0
    }

  case 'NEXT':
    return {
      ...state,
      index: state.index < state.import.valid_count - 1 ? state.index + 1 : state.index
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      import_items: action.result.data,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
