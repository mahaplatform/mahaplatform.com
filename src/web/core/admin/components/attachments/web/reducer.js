import _ from 'lodash'

export const INITIAL_STATE = {
  asset: null,
  cacheKey: _.random(100000, 999999).toString(36),
  response: null,
  status: 'pending',
  url: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLEAR':
    return {
      asset: null,
      cacheKey: _.random(100000, 999999).toString(36),
      response: null,
      status: 'pending',
      url: null
    }

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

  case 'DOWNLOAD_REQUEST':
    return {
      ...state,
      url: action.request.params.url,
      status: 'importing'
    }

  case 'DOWNLOAD_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'DOWNLOAD_SUCCESS':
    return {
      ...state,
      asset: action.result.data,
      status: 'success'
    }

  default:
    return state

  }

}

export default reducer
