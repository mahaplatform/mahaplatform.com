export const INITIAL_STATE = {
  agreement_status: 'pending',
  agreement: null,
  signed: false
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

  default:
    return state

  }

}

export default reducer
