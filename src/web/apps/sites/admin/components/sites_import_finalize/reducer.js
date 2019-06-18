export const INITIAL_STATE = {
  error: null,
  progress: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'IMPORT_FINALIZE_REQUEST':
    return {
      ...state,
      status: 'finalizing'
    }

  case 'SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'FAIL':
    return {
      ...state,
      error: action.error,
      status: 'failure'
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
