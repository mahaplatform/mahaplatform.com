import _ from 'lodash'

export const INITIAL_STATE = {
  code: null,
  cart: {
    value: null,
    status: 'pending'
  },
  error: null,
  products: {
    value: [],
    status: 'pending'
  }
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_PRODUCTS_REQUEST':
    return {
      ...state,
      products: {
        ...state.products,
        status: 'loading'
      }
    }

  case 'FETCH_PRODUCTS_FAILURE':
    return {
      ...state,
      error: action.result.message,
      products: {
        ...state.products,
        status: 'failed'
      }
    }

  case 'FETCH_PRODUCTS_SUCCESS':
    return {
      ...state,
      products: {
        value: action.result.data,
        status: 'success'
      }
    }

  case 'GET_CART_SUCCESS':
    const defaultValue = _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36)
    return {
      ...state,
      code: action.value || defaultValue
    }

  case 'FETCH_CART_REQUEST':
    return {
      ...state,
      cart: {
        ...state.cart,
        status: 'loading'
      }
    }

  case 'FETCH_CART_FAILURE':
    return {
      ...state,
      error: action.result.message,
      cart: {
        ...state.cart,
        status: 'failed'
      }
    }

  case 'FETCH_CART_SUCCESS':
    return {
      ...state,
      cart: {
        value: action.result.data,
        status: 'success'
      }
    }

  case 'SAVE_CART_REQUEST':
    return {
      ...state,
      cart: {
        ...state.cart,
        status: 'saving'
      }
    }

  case 'SAVE_CART_FAILURE':
    return {
      ...state,
      cart: {
        ...state.cart,
        status: 'failed'
      }
    }

  case 'SAVE_CART_SUCCESS':
    return {
      ...state,
      cart: {
        value: action.result.data,
        status: 'saved'
      }
    }

  default:
    return state

  }

}

export default reducer
