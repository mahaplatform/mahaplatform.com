export const INITIAL_STATE = {
  import: null,
  error: null,
  status: 'pending',
  progress: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'PARSE_REQUEST':

    return {
      ...state,
      status: 'parsing'
    }

  case 'PARSE_FALURE':

    return {
      ...state,
      status: 'failure',
      error: action.error
    }


  case 'INIT':

    return {
      ...state,
      import: action.import
    }

  case 'SUCCESS':

    return {
      ...state,
      status: 'success',
      import: action.import
    }

  case 'FAIL':

    return {
      ...state,
      status: 'failure',
      error: action.error
    }

  case 'UPDATE_PROGRESS':
    return {
      ...state,
      progress: action.progress
    }

  default:
    return state

  }

}

export default reducer
