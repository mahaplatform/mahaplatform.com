export const INITIAL_STATE = {
  folders: [],
  q: ''
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_FOLDER':
    return {
      ...state,
      folders: [
        ...state.folders,
        action.folder
      ],
      q: ''
    }

  case 'UP':
    return {
      ...state,
      folders: state.folders.slice(0, -1)
    }

  case 'SET_QUERY':
    return {
      ...state,
      q: action.q,
      folders: []
    }

  default:
    return state

  }

}

export default reducer
