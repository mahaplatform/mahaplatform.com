import flatten from 'flat'
import _ from 'lodash'

const INITIAL_STATE = {
  busy: [],
  data: {},
  entity: null,
  errors: {},
  ready: [],
  status: 'pending',
  validated: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_BUSY':
    return {
      ...state,
      busy: [
        ...action.value ? _.union(state.busy, [action.key]) : _.without(state.busy, action.key)
      ]
    }

  case 'SET_DATA':
    return {
      ...state,
      status: 'ready',
      data: {
        ...state.data,
        ..._.omitBy(action.data, _.isNil)
      }
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
      status: action.status
    }

  case 'SET_VALID':
    return {
      ...state,
      validated: [
        ..._.union(state.validated, [action.key])
      ],
      data: {
        ...state.data,
        [action.key]: action.value
      },
      errors: {
        ...state.errors,
        ...action.errors ? {
          [action.key]: action.errors
        } : {}
      }
    }

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'ready',
      data: {
        ...action.defaults,
        ...flatten(action.result.data)
      }
    }

  case 'UPDATE_DATA':
    return {
      ...state,
      data: {
        ...state.data,
        [action.key]: action.value
      },
      errors: _.omit(state.errors, action.key),
      status: 'ready',
      validated: _.without(state.validated, action.key)
    }

  case 'SUBMIT_REQUEST':
    return {
      ...state,
      status: 'submitting'
    }

  case 'SUBMIT_SUCCESS':
    return {
      ...state,
      status: 'success',
      entity: action.result.data
    }

  case 'FETCH_FAILURE':
  case 'SUBMIT_FAILURE':
    return {
      ...state,
      status: 'failure',
      errors: action.result.errors || {},
      message: action.result.message
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
