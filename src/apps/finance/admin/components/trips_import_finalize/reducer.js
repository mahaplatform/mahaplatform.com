export const INITIAL_STATE = {
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'IMPORT_FINALIZE_REQUEST':
    return {
      ...state,
      status: 'finalizing'
    }

  case 'IMPORT_FINALIZE_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'IMPORT_FINALIZE_FAILURE':
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
