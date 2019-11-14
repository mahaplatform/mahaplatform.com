export const INITIAL_STATE = {
  files: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_FILE':
    return {
      ...state,
      files: [
        ...state.files,
        action.file
      ]
    }

  case 'REMOVE_FILE':
    return {
      ...state,
      files: [
        ...state.files.filter((file, index) => {
          return index !== action.index
        })
      ]
    }

  case 'UPDATE_FILE':
    return {
      ...state,
      files: [
        ...state.files.map((file, index) => {
          if(file.uniqueIdentifier !== action.uid) return file
          return {
            ...file,
            ...action.data
          }
        })
      ]
    }

  default:
    return state

  }

}

export default reducer
