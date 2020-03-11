import _ from 'lodash'

const INITIAL_STATE = {
  records: [],
  request_id: null,
  selectAll: false,
  selectMode: '$in',
  selectedValues: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      request_id: action.request_id,
      status: (status !== 'pending' && action.request.params.$page.skip === 0) ? 'loading' : 'refreshing'
    }

  case 'FETCH_SUCCESS':
    if(action.request_id !== state.request_id) return state
    if(!_.includes(['loading','refreshing','delayed'], state.status)) return state
    const loaded = state.records ? state.records.length : 0
    if(action.result.pagination.all !== undefined) {
      return {
        ...state,
        all: action.result.pagination.all,
        request_id: null,
        records: (action.result.pagination.skip > 0) ? [
          ...state.records || [],
          ...action.result.data
        ] : action.result.data,
        total: action.result.pagination.total,
        status: (loaded + action.result.data.length >= action.result.pagination.total) ? 'completed' : 'loaded'
      }
    } else if(action.result.pagination.next !== undefined) {
      return {
        ...state,
        skip: action.result.pagination.skip,
        next: action.result.pagination.next,
        request_id: null,
        records: (action.result.pagination.skip > 0) ? [
          ...state.records || [],
          ...action.result.data
        ] : action.result.data,
        status: action.result.pagination.next === null ? 'completed' : 'loaded'
      }
    } else  {
      return state
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'SELECT':
    return {
      ...state,
      selectAll: false,
      selectedValues: [
        ..._.xor(state.selectedValues, [action.id])
      ]
    }

  case 'SELECT_ALL':
    return {
      ...state,
      selectAll: !state.selectAll,
      selectMode: state.selectAll ? '$in' : '$nin',
      selectedValues: []
    }

  case 'CLEAR_SELECTION':
    return {
      ...state,
      selectAll: false,
      selectMode: '$in',
      selectedValues: []
    }

  default:
    return state
  }

}

export default reducer
