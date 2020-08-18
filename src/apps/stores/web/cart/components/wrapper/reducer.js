import _ from 'lodash'

export const INITIAL_STATE = {
  code: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'GET_CART_SUCCESS':
    const defaultValue = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    return {
      ...state,
      code: action.value || defaultValue
    }

  default:
    return state

  }

}

export default reducer
