const INITIAL_STATE = {
  assignments: [{
    group_id: 1,
    user_id: null,
    is_everyone: false
  },{
    group_id: null,
    user_id: 79,
    is_everyone: false
  },{
    group_id: null,
    user_id: null,
    is_everyone: true
  }],
  status: 'pending',
  unassigned: []
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
      unassigned: action.result.data,
      status: 'ready'
    }

  default:
    return state
  }

}

export default reducer
