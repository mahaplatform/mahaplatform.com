export const INITIAL_STATE = {
  status: 'pending',
  profile: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHECK_RESULT':
    return {
      ...state,
      status: 'loading'
    }

  case 'CHECK_SUCCESS':
    return {
      ...state,
      profile: action.result.data,
      status: 'success'
    }

  case 'AUTHORIZED':
    return {
      ...state,
      profile: action.profile
    }

  default:
    return state

  }

}

export default reducer
