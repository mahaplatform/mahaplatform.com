import _ from 'lodash'

const INITIAL_STATE = {
  busy: [],
  data: {},
  errors: {},
  ready: [],
  status: 'pending',
  validated: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_BUSY':
    return {
      ...state,
      busy: [
        ...action.value ? _.union(state.busy, [action.key]) : _.without(state.busy, action.key)
      ]
    }

  case 'SET_READY':
    return {
      ...state,
      ready: [
        ..._.union(state.ready, [action.key])
      ]
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

  case 'UPDATE':
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
