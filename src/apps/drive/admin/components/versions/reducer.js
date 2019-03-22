export const INITIAL_STATE = {
  file: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SUCCESS':
    return {
      ...state,
      file: action.result.data
    }

  default:
    return state

  }

}

export default reducer
