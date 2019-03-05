export const INITIAL_STATE = {
  active: null,
  methods: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET_METHODS':
    return {
      ...state,
      methods: action.methods
    }

  case 'CHOOSE_METHOD':
    return {
      ...state,
      active: action.index
    }

  default:
    return state

  }

}

export default reducer
