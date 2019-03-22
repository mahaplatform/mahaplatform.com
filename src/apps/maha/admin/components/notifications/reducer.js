const INITIAL_STATE = {
  notifications: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'MARK_VISITED_SUCCESS':
    return {
      ...state,
      notifications: [
        ...state.notifications.map(notification => {
          if(notification.id !== action.result.data.id) return notification
          return {
            ...notification,
            is_viewed: true
          }
        })
      ]
    }

  case 'CLEAR':
    return {
      ...state,
      notifications: []
    }

  case 'PUSH':
    return {
      ...state,
      notifications: [
        ...state.notifications,
        {
          ...action.notification,
          code: action.code
        }
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      notifications: state.notifications.filter(notification => {
        return notification.code !== action.code
      })
    }

  default:
    return state
  }

}
