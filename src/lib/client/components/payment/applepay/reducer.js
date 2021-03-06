export const INITIAL_STATE = {
  error: null,
  result: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_REQUEST':
    return {
      ...state,
      error: null,
      status: 'submitting'
    }

  case 'SUBMIT_FAILURE':
    return {
      ...state,
      error: Object.values(action.result.errors)[0],
      status: 'failure'
    }

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      result: action.result.data,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
