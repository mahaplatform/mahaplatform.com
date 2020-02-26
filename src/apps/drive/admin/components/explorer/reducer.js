import specials from '../specials'
import _ from 'lodash'

export const INITIAL_STATE = {
  details: false,
  folders: [ specials.root ],
  q: '',
  preview: specials.root,
  selected: [],
  view: 'list'
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
      q: '',
      selected: []
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

  case 'ADD_SELECTED':
    return {
      ...state,
      selected: [
        ..._.xorBy(state.selected, [action.item], (item) => item.code)
      ]
    }

  case 'CLEAR_SELECTED':
    return {
      ...state,
      selected: []
    }

  case 'REPLACE_SELECTED':
    return {
      ...state,
      selected: action.item
    }

  case 'SHOW_DETAILS':
    return {
      ...state,
      details: action.show
    }

  case 'TOGGLE_VIEW':
    return {
      ...state,
      view: state.view === 'list' ? 'grid' : 'list'
    }
    
  default:
    return state

  }

}

export default reducer
