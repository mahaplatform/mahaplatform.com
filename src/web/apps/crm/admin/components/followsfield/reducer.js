const INITIAL_STATE = {
  networks: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      networks: [
        ...state.networks,
        action.network
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      networks: [
        ...state.networks.filter((network, index) => {
          return index !== action.index
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      networks: action.networks
    }

  case 'UPDATE':
    return {
      ...state,
      networks: [
        ...state.networks.map((network, index) => {
          return (index === action.index) ? action.network : network
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
