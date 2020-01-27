export const INITIAL_STATE = {
  embed: null,
  preview: null,
  src: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      src: action.data.src,
      embed: action.data.embed,
      preview: action.data.preview
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
      src: action.result.data.link,
      embed: action.result.data.video_url,
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
