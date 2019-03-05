export const INITIAL_STATE = {
  index: 0,
  status: 'loading',
  do: '',
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
      do: '',
      index: state.index > 0 ? state.index - 1 : 0
    }

  case 'NEXT':
    return {
      ...state,
      do: '',
      index: state.index < state.import.error_count - 1 ? state.index + 1 : 0
    }

  case 'CLEAR_DO':
    return {
      ...state,
      do: ''
    }

  case 'INDEX_RESET':
    return {
      ...state,
      index: 0
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

  case 'FIX_OMIT_SUCCESS':
    return {
      ...state,
      import: action.result.data,
      status: 'success',
      do: 'next'
    }

  default:
    return state

  }

}

export default reducer
