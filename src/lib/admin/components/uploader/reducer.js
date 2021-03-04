export const INITIAL_STATE = {
  uploads: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'PROGRESS':
    return {
      ...state,
      progress: action.progress
    }

  case 'ADD_UPLOAD':
    return {
      ...state,
      uploads: [
        ...state.uploads,
        {
          ...action.file,
          status: 'added',
          progress: 0,
          asset: null
        }
      ]
    }

  case 'UPDATE_UPLOAD_PROGRESS':
    return {
      ...state,
      uploads: state.uploads.map(upload => {
        if(upload.file.uniqueIdentifier !== action.uniqueIdentifier) return upload
        return {
          ...upload,
          status: 'uploading',
          progress: Math.floor(action.progress * 100)
        }
      })
    }

  case 'UPDATE_UPLOAD':
    return {
      ...state,
      uploads: state.uploads.map(upload => {
        if(upload.file.uniqueIdentifier !== action.uniqueIdentifier) return upload
        return {
          ...upload,
          ...action.meta
        }
      })
    }

  case 'REMOVE_UPLOAD':
    return {
      ...state,
      uploads: [
        ...state.uploads.filter(upload => {
          return upload.uniqueIdentifier !== action.file.uniqueIdentifier
        })
      ]
    }

  default:
    return state

  }

}

export default reducer
