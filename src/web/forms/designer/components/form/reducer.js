export const INITIAL_STATE = {
  data: {},
  errors: {},
  ready: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      },
      errors: {
        ...Object.keys(state.errors).reduce((errors, key) => {
          if(key === action.key) return errors
          return {
            ...errors,
            [key]: state.errors[key]
          }
        }, {})
      }
    }

  case 'SET_ERRORS':
    return {
      ...state,
      errors: action.errors
    }

  case 'SET_READY':
    return {
      ...state,
      ready: [
        ...state.ready,
        action.name
      ]
    }

  default:
    return state

  }

}

export default reducer
