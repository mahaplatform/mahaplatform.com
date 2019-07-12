import _ from 'lodash'

const INITIAL_STATE = {
  records: null,
  request_id: null,
  selectAll: false,
  selected: [],
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

  case 'FETCH_DELAY':
    return {
      ...state,
      status: 'delayed'
    }

  case 'FETCH_TIMEOUT':
    return {
      ...state,
      status: 'timeout'
    }

  case 'SELECT':
    const selected = (!_.includes(state.selected, action.id)) ? [
      ...state.selected,
      action.id
    ] : state.selected.filter(id => id !== action.id)
    const all = state.records ? state.records.map(record => record.id) : []
    const selectAll = _.isEqual(all.sort(), selected.sort())
    return {
      ...state,
      selectAll,
      selected
    }

  case 'SELECT_ALL':
    const all2 = state.records ? state.records.map(record => record.id) : []
    const selectAll2 = !_.isEqual(all2.sort(), state.selected.sort())
    return {
      ...state,
      selectAll,
      selected: selectAll2 ? all2 : []
    }

  default:
    return state
  }

}

export default reducer
