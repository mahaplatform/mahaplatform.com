import _ from 'lodash'

export const INITIAL_STATE = {
  adding: false,
  files: [],
  sources: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_PROFILES_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_PROFILES_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      sources: action.result.data
    }

  case 'ADD_FILE':
    return {
      ...state,
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

  case 'REMOVE':
    return {
      ...state,
      files: [
        ...state.files.filter((file, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state

  }

}

export default reducer
