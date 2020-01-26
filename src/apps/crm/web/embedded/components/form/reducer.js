export const INITIAL_STATE = {
  data: {},
  errors: {},
  human: false,
  status: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE':
    return {
      ...state,
      data: {
        ...state.data,
        [action.name]: action.value
      },
      errors: {
        ...Object.keys(state.errors).reduce((errors, name) => {
          if(name === action.name) return errors
          return {
            ...errors,
            [name]: state.errors[name]
          }
        }, {})
      },
      status: {
        ...state.status,
        [action.name]: 'ready'
      }
    }

  case 'SET_HUMAN':
    return {
      ...state,
      human: true
    }

  case 'SET_STATUS':
    return {
      ...state,
      status: {
        ...state.status,
        [action.name]: action.status
      }
    }

  case 'SET_All_STATUS':
    return {
      ...state,
      status: {
        ...Object.keys(state.status).reduce((status, name) => ({
          ...status,
          [name]: action.status
        }), {})
      }
    }

  case 'SET_VALIDATE':
    return {
      ...state,
      status: {
        ...state.status,
        [action.name]: action.status
      },
      errors: action.error ? {
        ...state.errors,
        [action.name]: action.error
      } : state.errors
    }

  default:
    return state

  }

}

export default reducer
