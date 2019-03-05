export const INITIAL_STATE = {
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

    case 'IMPORT_FINALIZE_REQUEST':

      return {
        ...state,
        status: 'finalizing',
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
