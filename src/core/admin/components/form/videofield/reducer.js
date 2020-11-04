export const INITIAL_STATE = {
  embed: null,
  preview: null,
  src: null
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
      embed: null,
      preview: null
    }

  default:
    return state
  }

}

export default reducer
