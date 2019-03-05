import _ from 'lodash'

export const INITIAL_STATE = {
  ignored: [],
  items: [],
  status: 'pending'
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      ignored: action.ignored
    }

  case 'LOAD_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'LOAD_SUCCESS':
    return {
      ...state,
      items: action.result.data,
      status: 'success'
    }

  case 'TOGGLE':
    const included = _.find(state.ignored, {
      notification_type_id: action.notification_type_id
    }) !== undefined
    return {
      ...state,
      ignored: [
        ...state.ignored.map(item => {
          if(item.notification_type_id !== action.notification_type_id) return item
          return {
            ...item,
            [`${action.method}_enabled`]: !item[`${action.method}_enabled`]
          }
        }),
        ...!included ? [{
          notification_type_id: action.notification_type_id,
          inapp_enabled: true,
          push_enabled: true,
          email_enabled: true,
          [`${action.method}_enabled`]: false
        }] : []
      ]
    }

  default:
    return state
  }

}
