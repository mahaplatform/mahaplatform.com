export const INITIAL_STATE = {
  files: [],
  sources: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      sources: action.result.data
    }

  case 'CREATE_REQUEST':
    return {
      ...state,
      files: [
        ...action.multiple ? state.files : [],
        {
          ...action.file,
          status: 'importing'
        }
      ]
    }

  case 'CREATE_FAILURE':
    return {
      ...state,
      files: state.files.map(file => {
        if(file.id !== action.file.id) return file
        return {
          ...file,
          status: 'failed'
        }
      })
    }

  case 'CREATE_SUCCESS':
    return {
      ...state,
      files: state.files.map(file => {
        if(file.id !== action.file.id) return file
        return {
          ...file,
          asset: action.result.data,
          status: 'imported'
        }
      })
    }

  case 'ADD':
    return {
      ...state,
      files: [
        ...state.files,
        {
          ...action.file,
          status: 'imported'
        }
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
