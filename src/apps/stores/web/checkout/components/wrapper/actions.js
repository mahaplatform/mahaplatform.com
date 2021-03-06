export const getCart = () => ({
  type: 'LOCAL_GET',
  key: 'cart',
  request: 'GET_CART_REQUEST',
  success: 'GET_CART_SUCCESS',
  failure: 'GET_CART_FAILURE'
})

export const setCart = (value) => ({
  type: 'LOCAL_SET',
  key: 'cart',
  value,
  request: 'SET_CART_REQUEST',
  success: 'SET_CART_SUCCESS',
  failure: 'SET_CART_FAILURE'
})
