const INITIAL_STATE = {
  numbers: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      numbers: [
        ...state.numbers,
        { number: '', is_primary: false }
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      numbers: [
        ...state.numbers.filter((email, index) => {
          return index !== action.index
        }).map((email, index) => {
          if(index > 0) return email
          return {
            ...email,
            is_primary: state.numbers[action.index].is_primary ? true : email.is_primary
          }
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      numbers: action.numbers
    }

  case 'UPDATE':
    return {
      ...state,
      numbers: [
        ...state.numbers.map((email, index) => {
          if(index === action.index) return action.value
          return {
            ...email,
            is_primary: action.value.is_primary ? false : email.is_primary
          }
        })
      ]
    }

  default:
    return state
  }

}

export default reducer
