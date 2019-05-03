import _ from 'lodash'

export const INITIAL_STATE = {
  apps: [],
  app_ids: [],
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_ASSIGNED':
    return {
      ...state,
      app_ids: action.assigned
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      apps: action.result.data,
      status: 'success'
    }

  case 'TOGGLE_APP':
    const app_included = _.includes(state.app_ids, action.app_id)
    return {
      ...state,
      app_ids: app_included ? _.without(state.app_ids, action.app_id) : [
        ...state.app_ids,
        action.app_id
      ]
    }

  default:
    return state

  }

}
