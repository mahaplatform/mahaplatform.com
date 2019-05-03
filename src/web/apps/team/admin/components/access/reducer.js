import _ from 'lodash'

export const INITIAL_STATE = {
  status: 'pending',
  access: [],
  app_ids: [],
  right_ids: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_ASSIGNED':
    return {
      ...state,
      ...action.assigned
    }

  case 'LOAD_SUCCESS':
    return {
      ...state,
      access: action.result.data
    }

  case 'TOGGLE_APP':
    const index = _.findIndex(state.access, { id: action.app_id })
    const app_right_ids = state.access[index].rights.map(right => right.id)
    const app_included = _.includes(state.app_ids, action.app_id)
    return {
      ...state,
      app_ids: app_included ? _.without(state.app_ids, action.app_id) : [
        ...state.app_ids,
        action.app_id
      ],
      right_ids: app_included ? _.without(state.right_ids, ...app_right_ids) : state.right_ids
    }

  case 'TOGGLE_RIGHT':
    return {
      ...state,
      right_ids: _.includes(state.right_ids, action.right_id) ? _.without(state.right_ids, action.right_id) : [
        ...state.right_ids,
        action.right_id
      ]
    }

  default:
    return state

  }

}
