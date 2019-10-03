export const INITIAL_STATE = {
  ids: [],
  status: 'pending',
  channel: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      ids: action.ids
    }

  case 'SHARE_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'SHARE_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'SHARE_SUCCESS':
    return {
      ...state,
      channel: action.result.data,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
