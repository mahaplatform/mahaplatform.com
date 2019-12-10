export const INITIAL_STATE = {
  payment: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      payment: action.result
    }

  default:
    return state

  }

}

export default reducer
