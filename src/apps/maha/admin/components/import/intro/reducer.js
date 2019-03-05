export const INITIAL_STATE = {
  imports: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

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
      imports: action.result.data,
      status: 'success'
    }

  case 'DESTROY_SUCCESS':
    return {
      ...state,
      imports: [
        ...state.imports.filter(imp => imp.id !== action.id)
      ]
    }

  default:
    return state

  }

}

export default reducer
