export const fetchProducts = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/finance/products',
  request: 'FETCH_PRODUCTS_REQUEST',
  success: 'FETCH_PRODUCTS_SUCCESS',
  failure: 'FETCH_PRODUCTS_FAILURE'
})

export const fetchCoupons = (types) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint: '/api/admin/finance/coupons',
  request: 'FETCH_COUPONS_REQUEST',
  success: 'FETCH_COUPONS_SUCCESS',
  failure: 'FETCH_COUPONS_FAILURE'
})

export const add = (line_item) => ({
  type: 'ADD',
  line_item
})

export const remove = (index) => ({
  type: 'REMOVE',
  index
})
