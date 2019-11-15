export const INITIAL_STATE = {
  token: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      token: action.result.data
    }

  default:
    return state

  }

}

export default reducer
