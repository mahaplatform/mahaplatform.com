const INITIAL_STATE = {
  filter: {},
  filtering: false,
  open: false,
  panel: null,
  q: '',
  records: null,
  selected: {
    filter: {},
    values: [],
    mode: '$in',
    total: 0
  },
  sort: {
    key: null,
    order: null
  }
}

const reducer = (state = INITIAL_STATE, action)=> {

  switch (action.type) {

  case 'SET_PARAMS':
    return {
      ...state,
      filter: action.filter,
      sort: action.sort
    }

  case 'SET_SELECTED':
    return {
      ...state,
      selected: action.selected
    }

  case 'FILTER':
    return {
      ...state,
      filter: action.filter
    }

  case 'SORT':
    return {
      ...state,
      sort: {
        key: action.key,
        order: (state.sort.key == action.key && state.sort.order == 'asc') ? 'desc' : 'asc'
      }
    }

  case 'SET_RECORDS':
    return {
      ...state,
      records: action.records
    }

  case 'SET_FILTER':
    return {
      ...state,
      filter: action.filter
    }

  case 'SET_QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'TOGGLE_FILTER':
    return {
      ...state,
      filtering: !state.filtering
    }

  case 'ADD_PANEL':
    return {
      ...state,
      open: true,
      panel: action.panel
    }

  case 'REMOVE_PANEL':
    return {
      ...state,
      open: false
    }

  case 'CLEAR_PANEL':
    return {
      ...state,
      panel: null
    }

  default:
    return state
  }

}

export default reducer
