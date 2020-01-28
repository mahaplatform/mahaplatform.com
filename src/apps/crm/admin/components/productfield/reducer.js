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

  default:
    return state
  }

}

export default reducer
