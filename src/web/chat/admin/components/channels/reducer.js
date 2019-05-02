export const INITIAL_STATE = {
  channel_type: 'active',
  q: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'CHANGE_TYPE':
    return {
      ...state,
      channel_type: action.channel_type
    }

  default:
    return state

  }

}

export default reducer
