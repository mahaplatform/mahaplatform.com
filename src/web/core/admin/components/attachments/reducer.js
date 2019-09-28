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
        ...state.files.map((file, index) => {
          if(index !== action.index) return file
          return {
            ...file,
            status: 'importing'
          }
        })
      ]
    }

  case 'CREATE_FAILURE':
    return {
      ...state,
      files: [
        ...state.files.map((file, index) => {
          if(index !== action.index) return file
          return {
            ...file,
            status: 'failed'
          }
        })
      ]
    }

  case 'CREATE_SUCCESS':
    return {
      ...state,
      files: [
        ...state.files.map((file, index) => {
          if(index !== action.index) return file
          return {
            ...file,
            asset: action.result.data,
            status: 'complete'
          }
        })
      ]
    }

  case 'ADD':
    return {
      ...state,
      files: [
        ...state.files,
        action.file
      ]
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
