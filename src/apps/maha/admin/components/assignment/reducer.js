import _ from 'lodash'

export const INITIAL_STATE = {
  adding: false,
  assigned: {
    status: 'pending',
    records: []
  },
  q: '',
  unassigned: {
    status: 'pending',
    records: []
  },
  types: {
    status: 'pending',
    records: []
  }
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      adding: false,
      assigned: {
        ...state.assigned,
        records: [
          ...state.assigned.records,
          action.assignee
        ]
      }
    }

  case 'BEGIN_ADD':
    return {
      ...state,
      adding: true
    }

  case 'FETCH_ASSIGNED_REQUEST':
    return {
      ...state,
      assigned: {
        ...state.assigned,
        status: 'loading'
      }
    }

  case 'FETCH_ASSIGNED_SUCCESS':
    return {
      ...state,
      assigned: {
        records: action.result.data,
        status: 'success'
      }
    }

  case 'FETCH_UNASSIGNED_REQUEST':
    return {
      ...state,
      unassigned: {
        ...state.unassigned,
        status: 'loading'
      }
    }

  case 'FETCH_UNASSIGNED_SUCCESS':
    return {
      ...state,
      unassigned: {
        records: action.result.data,
        status: 'success'
      }
    }

  case 'QUERY':
    return {
      ...state,
      q: action.q
    }

  case 'REMOVE':
    return {
      ...state,
      assigned: {
        ...state.assigned,
        records: [
          ...state.assigned.records.filter((assignment, index) => {
            return index !== action.index
          })
        ]
      }
    }

  case 'SAVE_REQUEST':
    return {
      ...state,
      assigned: {
        ...state.assigned,
        status: 'saving'
      }
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      assigned: {
        ...state.assigned,
        status: 'saved'
      }
    }

  case 'SET_ASSIGNED':
    return {
      ...state,
      assigned: {
        records: action.assigned,
        status: 'success'
      }
    }

  case 'SET_TYPES':
    return {
      ...state,
      types: {
        records: action.types,
        status: 'success'
      }
    }

  case 'CHANGE_TYPE':
    const assigned = state.assigned.records[action.index]
    const type_index = _.findIndex(state.types.records, { value: assigned[action.name] })
    const next_type_index = (type_index + 1) % state.types.records.length
    return {
      ...state,
      assigned: {
        ...state.assigned,
        records: [
          ...state.assigned.records.map((assigned, index) => ({
            ...assigned,
            [action.name]: (index === action.index) ? state.types.records[next_type_index].value: assigned[action.name]
          }))
        ]
      }
    }

  default:
    return state

  }

}

export default reducer
