export const INITIAL_STATE = {
  agreement_status: 'pending',
  agreement: null,
  signed: false,
  email: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLEAR':
    return INITIAL_STATE

  case 'CREATE_AGREEMENT_REQUEST':
    return {
      ...state,
      agreement_status: 'loading',
      agreement: null
    }

  case 'CREATE_AGREEMENT_SUCCESS':
    if(action.result.data.email !== state.email) return { ...state }
    return {
      ...state,
      agreement: action.result.data,
      agreement_status: 'success'
    }

  case 'SIGNED':
    return {
      ...state,
      signed: true
    }

  case 'SET_EMAIL':
    return {
      ...state,
      email: action.email
    }

  default:
    return state

  }

}

export default reducer
