const INITIAL_STATE = {
  title: null,
  items: null,
  open: false
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'OPEN':
    return {
      ...state,
      title: action.tasks.title,
      items: action.tasks.items,
      open: true
    }

  case 'CLOSE':
    return {
      ...state,
      open: false
    }

  case 'CLEAR':
    return INITIAL_STATE

  default:
    return state
  }

}

export default reducer
