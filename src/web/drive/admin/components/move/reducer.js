export const INITIAL_STATE = {
  folders: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_FOLDER':
    return {
      ...state,
      folders: [
        ...state.folders,
        action.folder
      ]
    }

  case 'MOVE_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'UP':
    return {
      ...state,
      folders: state.folders.slice(0, -1)
    }

  default:
    return state

  }

}

export default reducer
