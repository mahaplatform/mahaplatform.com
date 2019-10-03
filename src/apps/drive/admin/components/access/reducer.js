export const INITIAL_STATE = {
  adding: false,
  assigned: {
    records: [],
    status: 'pending'
  },
  q: '',
  unassigned: {
    records: [],
    status: 'pending'
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
        records: action.result.data.map(assignment => ({
          ...assignment,
          is_revoked: false
        })),
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

  case 'UPDATE':
    return {
      ...state,
      assigned: {
        ...state.assigned,
        records: [
          ...state.assigned.records.map((assignment, index) => ({
            ...assignment,
            access_type_id: index === action.index ? action.access_type_id : assignment.access_type_id
          }))
        ]
      }
    }

  case 'REVOKE':
    return {
      ...state,
      assigned: {
        ...state.assigned,
        records: [
          ...state.assigned.records.map((assignment, index) => ({
            ...assignment,
            is_revoked: index === action.index ? !assignment.is_revoked : assignment.is_revoked
          }))
        ]
      }
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

  default:
    return state

  }

}

export default reducer
