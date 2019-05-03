export const INITIAL_STATE = {
  asset: null,
  response: null,
  status: 'pending',
  url: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOOKUP_REQUEST':
    return {
      ...state,
      status: 'previewing',
      url: action.request.params.url,
      response: null
    }

  case 'LOOKUP_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'LOOKUP_SUCCESS':
    return {
      ...state,
      response: action.result.data,
      status: 'previewed'
    }

  case 'IMPORT_REQUEST':
    return {
      ...state,
      url: action.request.params.url,
      status: 'importing'
    }

  case 'IMPORT_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'IMPORT_SUCCESS':
    return {
      ...state,
      status: 'success',
      asset: action.result.data
    }

  default:
    return state

  }

}

export default reducer
