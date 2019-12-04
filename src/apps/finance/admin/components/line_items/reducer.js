const INITIAL_STATE = {
  coupons: {
    records: null,
    status: 'pending'
  },
  products: {
    records: null,
    status: 'pending'
  },
  line_items: [],
  coupon_id: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_COUPONS_REQUEST':
    return {
      ...state,
      coupons: {
        status: 'loading'
      }
    }

  case 'FETCH_COUPONS_SUCCESS':
    return {
      ...state,
      coupons: {
        records: action.result.data,
        status: 'success'
      }
    }

  case 'FETCH_PRODUCTS_REQUEST':
    return {
      ...state,
      products: {
        status: 'loading'
      }
    }

  case 'FETCH_PRODUCTS_SUCCESS':
    return {
      ...state,
      products: {
        records: action.result.data,
        status: 'success'
      }
    }

  case 'ADD_COUPON':
    return {
      ...state,
      coupon_id: action.coupon_id
    }

  case 'REMOVE_COUPON':
    return {
      ...state,
      coupon_id: null
    }

  case 'ADD_LINE_ITEM':
    return {
      ...state,
      line_items: [
        ...state.line_items,
        action.line_item
      ]
    }

  case 'REMOVE_LINE_ITEM':
    return {
      ...state,
      line_items: [
        ...state.line_items.filter((line_item, index) => {
          return index !== action.index
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
