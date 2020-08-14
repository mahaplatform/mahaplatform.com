export const fetchProducts = (name) => ({
  type: 'API_REQUEST',
  endpoint: `/api/stores/stores/${name}/products`,
  request: 'FETCH_PRODUCTS_REQUEST',
  success: 'FETCH_PRODUCTS_SUCCESS',
  failure: 'FETCH_PRODUCTS_FAILURE'
})

export const loadCart = () => ({
  type: 'LOCAL_GET',
  key: 'cart',
  request: 'LOAD_CART_REQUEST',
  success: 'LOAD_CART_SUCCESS',
  failure: 'LOAD_CART_FAILURE'
})
