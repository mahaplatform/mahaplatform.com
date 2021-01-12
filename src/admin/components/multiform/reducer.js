const INITIAL_STATE = {
  formdata: null,
  status: 'pending',
  step: -1
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'ready',
      formdata: action.result.data
    }

  case 'FETCH_FAILED':
    return {
      ...state,
      status: 'failure'
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_FAILED':
    return {
      ...state,
      status: 'failure'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      formdata: action.result.data,
      status: 'success'
    }

  case 'SET_DATA':
    return {
      ...state,
      status: 'ready',
      formdata: action.formdata
    }

  case 'SET_STEP':
    return {
      ...state,
      step: action.step
    }

  case 'UPDATE_DATA':
    return {
      ...state,
      formdata: action.formdata,
      step: action.step
    }

  default:
    return state
  }

}
