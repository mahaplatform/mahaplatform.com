const INITIAL_STATE = {
  rules: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      rules: [
        ...state.rules,
        action.rule
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      rules: [
        ...state.rules.filter((rule, index) => {
          return index !== action.index
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      rules: action.rules
    }

  case 'UPDATE':
    return {
      ...state,
      rules: [
        ...state.rules.map((rule, index) => {
          if(index !== action.index) return rule
          return action.rule
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
