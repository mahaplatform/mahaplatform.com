export const fetchProducts = (name) => ({
  type: 'API_REQUEST',
  endpoint: `/api/stores/stores/${name}/products`,
  request: 'FETCH_PRODUCTS_REQUEST',
  success: 'FETCH_PRODUCTS_SUCCESS',
  failure: 'FETCH_PRODUCTS_FAILURE'
})

export const fetchCart = (name, code) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: `/api/stores/stores/${name}/carts/${code}`,
  request: 'FETCH_CART_REQUEST',
  success: 'FETCH_CART_SUCCESS',
  failure: 'FETCH_CART_FAILURE'
})

export const getCart = () => ({
  type: 'LOCAL_GET',
  key: 'cart',
  request: 'GET_CART_REQUEST',
  success: 'GET_CART_SUCCESS',
  failure: 'GET_CART_FAILURE'
})
