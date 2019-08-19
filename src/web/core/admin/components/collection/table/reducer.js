import _ from 'lodash'

const INITIAL_STATE = {
  hidden: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'LOAD_HIDDEN_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'LOAD_HIDDEN_FAILURE':
    return {
      ...state,
      status: 'failure'
    }

  case 'LOAD_HIDDEN_SUCCESS':
    return {
      ...state,
      hidden: action.value || action.defaults,
      status: 'success'
    }

  case 'TOGGLE_HIDDEN':
    return {
      ...state,
      hidden: [
        ..._.xor(state.hidden, [action.key])
      ]
    }

  default:
    return state
  }

}

export default reducer
