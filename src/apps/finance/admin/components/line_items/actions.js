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

export const addCoupon = (coupon_id) => ({
  type: 'ADD_COUPON',
  coupon_id
})

export const removeCoupon = () => ({
  type: 'REMOVE_COUPON'
})

export const addLineItem = (line_item) => ({
  type: 'ADD_LINE_ITEM',
  line_item
})

export const removeLineItem = (index) => ({
  type: 'REMOVE_LINE_ITEM',
  index
})
