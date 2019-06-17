export const INITIAL_STATE = {
  import: null,
  error: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'INIT':

    return {
      ...state,
      import: action.import
    }

  case 'PROCESS_REQUEST':

    return {
      ...state,
      status: 'processing'
    }

  case 'PROCESS_SUCCESS':

    return {
      ...state,
      status: 'processing'
    }

  case 'SUCCESS':

    return {
      ...state,
      status: 'success'
    }

  case 'FAIL':

    return {
      ...state,
      status: 'failure'
    }

  case 'SET_IMPORT':
    return {
      ...state,
      import: action.import
    }

  case 'PROCESS_IMPORT_FAILURE':

    return {
      ...state,
      status: 'failure'
    }

  case 'UPDATE_IMPORT_REQUEST':
    return {
      ...state
    }

  case 'UPDATE_IMPORT_FAILURE':
    return {
      ...state
    }

  case 'UPDATE_IMPORT_SUCCESS':
    return {
      ...state,
      import: action.result.data
    }

  case 'UPDATE_PROGRESS':
    return {
      ...state,
      import: action.import
    }

  default:
    return state

  }

}

export default reducer
