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

  case 'SET_HUMAN':
    return {
      ...state,
      human: true
    }

  case 'SET_READY':
    return {
      ...state,
      ready: [
        ..._.union(state.ready, [action.name])
      ]
    }

  case 'SET_STATUS':
    return {
      ...state,
      status: action.status
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

  case 'SUBMIT_FORM_REQUEST':
    return {
      ...state,
      status: 'submitting'
    }

  case 'SUBMIT_FORM_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'SUBMIT_FORM_SUCCESS':
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
