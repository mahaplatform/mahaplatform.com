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

  case 'REORDER':
    return {
      ...state,
      products: (action.from < action.to) ? [
        ...state.products.slice(0, action.from),
        ...state.products.slice(action.from + 1, action.to + 1),
        state.products[action.from],
        ...state.products.slice(action.to + 1)
      ] : [
        ...state.products.slice(0, action.to),
        state.products[action.from],
        ...state.products.slice(action.to, action.from),
        ...state.products.slice(action.from + 1)
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
