const INITIAL_STATE = {
  emails: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD':
    return {
      ...state,
      emails: [
        ...state.emails,
        { address: '', is_primary: false }
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      emails: [
        ...state.emails.filter((email, index) => {
          return index !== action.index
        }).map((email, index) => {
          if(index > 0) return email
          return {
            ...email,
            is_primary: state.emails[action.index].is_primary ? true : email.is_primary
          }
        })
      ]
    }

  case 'SET':
    return {
      ...state,
      emails: action.emails
    }

  case 'UPDATE':
    return {
      ...state,
      emails: [
        ...state.emails.map((email, index) => {
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
