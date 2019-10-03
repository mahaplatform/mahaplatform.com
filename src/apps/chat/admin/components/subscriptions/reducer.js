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

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'SAVE_SUCCESS':
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
