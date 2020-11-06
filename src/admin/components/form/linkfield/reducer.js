export const INITIAL_STATE = {
  link: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      link: null,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      link: action.result.data,
      status: 'success'
    }

  case 'FETCH_LINK_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}

export default reducer
