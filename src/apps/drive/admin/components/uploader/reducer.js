export const INITIAL_STATE = {
  files: [],
  progress: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
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
      files: []
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

  case 'TOGGLE':
    return {
      ...state,
      progress: !state.progress
    }

  case 'UPDATE':
    return {
      ...state,
      files: [
        ...state.files.map((file, index) => {
          if(index !== action.index) return file
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
