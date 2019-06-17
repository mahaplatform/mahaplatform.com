export const INITIAL_STATE = {
  status: 'pending',
  result: null,
  ids: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      ids: action.ids
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      result: action.result.data,
      status: 'success'
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state

  }

}

export default reducer
