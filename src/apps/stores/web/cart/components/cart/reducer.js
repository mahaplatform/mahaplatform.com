export const INITIAL_STATE = {
  cart: null,
  error: null,
  products: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_PRODUCTS_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_PRODUCTS_FAILURE':
    return {
      ...state,
      error: action.result.message,
      status: 'failed'
    }

  case 'FETCH_PRODUCTS_SUCCESS':
    return {
      ...state,
      products: action.result.data,
      status: 'success'
    }

  case 'GET_CART_SUCCESS':
    return {
      ...state,
      cart: action.value
    }

  case 'SET_CART_SUCCESS':
    return {
      ...state,
      cart: action.value
    }

  default:
    return state

  }

}

export default reducer
