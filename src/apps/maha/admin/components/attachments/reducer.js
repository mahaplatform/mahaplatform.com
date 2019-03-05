import _ from 'lodash'

export const INITIAL_STATE = {
  active: null,
  files: [],
  sources: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_SOURCES':
    return {
      ...state,
      sources: action.sources
    }

  case 'CHOOSE_SOURCE':
    return {
      ...state,
      active: action.index
    }

  case 'ADD_FILE':
    return {
      ...state,
      status: 'success',
      files: [
        ...state.files,
        action.file
      ]
    }

  case 'ADD_ASSET':
    return {
      ...state,
      files: state.files.map(file => {
        if(file.id !== action.file_id) return file
        return {
          ...file,
          asset: action.asset
        }
      })
    }

  case 'CREATE_REQUEST':
    return {
      ...state,
      files: [
        ...state.files,
        action.file
      ]
    }

  case 'CREATE_SUCCESS':
    return {
      ...state,
      status: 'success',
      files: state.files.map(file => {
        if(file.id !== action.file.id) return file
        return {
          ...file,
          asset: action.result.data
        }
      })
    }

  case 'REMOVE_ASSET':
    const assetIndex = _.findIndex(state.files, { asset: { id: action.asset.id } })
    return {
      ...state,
      files: [
        ...state.files.slice(0, assetIndex),
        ...state.files.slice(assetIndex + 1)
      ]
    }

  case 'REMOVE_FILE':
    const fileIndex = _.findIndex(state.files, { id: action.file.id, network: action.file.network })
    return {
      ...state,
      files: [
        ...state.files.slice(0, fileIndex),
        ...state.files.slice(fileIndex + 1)
      ]
    }

  default:
    return state

  }

}

export default reducer
