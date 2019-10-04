export const INITIAL_STATE = {
  caption: null,
  video: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      video: action.video
    }

  case 'REMOVE':
    return {
      ...state,
      video: null,
      status: 'pending'
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      video: null,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      video: action.result.data,
      caption: action.result.data.text,
      status: 'success'
    }

  case 'FETCH_LINK_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}

export default reducer
