import _ from 'lodash'

export const INITIAL_STATE = {
  data: {},
  errors: {},
  human: false,
  ready: [],
  status: 'ready',
  validated: []
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
      errors: _.omit(state.errors, action.name),
      status: 'ready',
      validated: _.without(state.validated, action.name)
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

  case 'SET_HUMAN':
    return {
      ...state,
      human: true
    }

  case 'SET_READY':
    return {
      ...state,
      ready: [
        ..._.union(state.ready, [action.key])
      ]
    }

  case 'SET_STATUS':
    return {
      ...state,
      status: state.status
    }

  case 'SET_VALID':
    return {
      ...state,
      validated: [
        ..._.union(state.validated, [action.name])
      ],
      data: {
        ...state.data,
        [action.name]: action.value
      },
      errors: {
        ...state.errors,
        ...action.error ? {
          [action.name]: action.error
        } : {}
      }
    }

  case 'SUBMIT_REQUEST':
    return {
      ...state,
      status: 'submitting'
    }

  case 'SUBMIT_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      status: 'success'
    }

  case 'VALIDATE':
    return {
      ...state,
      status: 'validating',
      validated: []
    }

  default:
    return state

  }

}

export default reducer
