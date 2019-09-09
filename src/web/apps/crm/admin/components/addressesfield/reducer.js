const INITIAL_STATE = {
  addresses: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      addresses: [
        ...state.addresses,
        { address: '', is_primary: false }
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      addresses: [
        ...state.addresses.filter((address, index) => {
          return index !== action.index
        }).map((address, index) => {
          if(index > 0) return address
          return {
            ...address,
            is_primary: state.addresses[action.index].is_primary ? true : address.is_primary
          }
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      addresses: action.addresses
    }

  case 'UPDATE':
    return {
      ...state,
      addresses: [
        ...state.addresses.map((address, index) => {
          if(index === action.index) return action.value
          return {
            ...address,
            is_primary: action.value.is_primary ? false : address.is_primary
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
