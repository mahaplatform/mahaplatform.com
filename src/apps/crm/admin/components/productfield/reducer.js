const INITIAL_STATE = {
  products: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      products: [
        ...state.products,
        action.product
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      products: [
        ...state.products.filter((product, index) => {
          return index !== action.index
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      products: action.products
    }

  case 'UPDATE':
    return {
      ...state,
      products: [
        ...state.products.map((product, index) => {
          return index === action.index ? action.product : product
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
