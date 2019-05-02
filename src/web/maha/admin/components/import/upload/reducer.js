export const INITIAL_STATE = {
  import: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CREATE_IMPORT_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'CREATE_IMPORT_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'CREATE_IMPORT_SUCCESS':
    return {
      ...state,
      import: action.result.data,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
