import specials from '../specials'

export const INITIAL_STATE = {
  details: false,
  folders: [ specials.root ],
  q: '',
  preview: specials.root
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

  case 'FETCH_FOLDER_SUCCESS':
    return {
      ...state,
      folders: [
        ...state.folders,
        action.result.data
      ],
      preview: action.result.data
    }

  case 'UP':
    return {
      ...state,
      folders: state.folders.slice(0, -1),
      preview: state.folders.slice(0, -1).pop()
    }

  case 'SET_QUERY':
    return {
      ...state,
      folders: [ specials.root ],
      preview: specials.root,
      q: action.q
    }

  case 'PREVIEW':
    return {
      ...state,
      preview: action.item
    }

  case 'SHOW_DETAILS':
    return {
      ...state,
      details: action.show
    }

  default:
    return state

  }

}

export default reducer
