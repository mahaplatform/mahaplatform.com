export const INITIAL_STATE = {
  import: null,
  error: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'PARSE_OMITERRORS_REQUEST':

    return {
      ...state,
      status: 'loading'
    }

  case 'PARSE_OMITERRORS_SUCCESS':

    return {
      ...state,
      import: action.result.data,
      status: 'success'
    }

  case 'INIT':

    return {
      ...state,
      import: action.import
    }

  case 'FETCH_SUCCESS':

    return {
      ...state,
      import: action.result.data
    }

  case 'UPDATE_IMPORT_SUCCESS':
    return {
      ...state,
      import: action.result.data,
      status: 'saved'
    }

  default:
    return state

  }

}

export default reducer
