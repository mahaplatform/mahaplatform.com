export const INITIAL_STATE = {
  preview: null,
  src: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      link_id: action.link_id,
      src: action.src
    }

  case 'REMOVE':
    return {
      ...state,
      src: null,
      status: 'pending'
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      src: null,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      src: action.result.data.video_url,
      preview: action.result.data.image_url,
      status: 'success'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}

export default reducer
