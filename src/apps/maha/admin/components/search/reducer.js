import _ from 'lodash'

export const INITIAL_STATE = {
  cacheKey: null,
  chosen: null,
  query: '',
  results: null,
  recent: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'TYPE':
    return {
      ...state,
      query: action.q
    }

  case 'FETCH_RESULTS_REQUEST':
    return {
      ...state,
      chosen: null,
      query: action.request.params.q
    }

  case 'FETCH_RESULTS_SUCCESS':
    return {
      ...state,
      results: (state.query.length) ? action.result.data : null
    }

  case 'CLEAR_RECENT_SUCCESS':
    return {
      ...state,
      cacheKey: _.random(100000, 999999).toString(36)
    }

  case 'CHOOSE':
    return {
      ...state,
      chosen: {
        model: action.model,
        index: action.index
      }
    }

  default:
    return state
  }

}
