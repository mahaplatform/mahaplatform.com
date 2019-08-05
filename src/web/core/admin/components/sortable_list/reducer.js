const INITIAL_STATE = {
  items: []
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      items: action.items
    }

  case 'TOGGLE':
    return {
      ...state,
      items: state.items.map((item, index) => {
        if(index !== action.index) return item
        return {
          ...item,
          checked: !item.checked
        }
      })
    }

  case 'MOVE':
    return {
      ...state,
      items: (action.from < action.to) ? [
        ...state.items.slice(0, action.from),
        ...state.items.slice(action.from + 1, action.to + 1),
        state.items[action.from],
        ...state.items.slice(action.to + 1)
      ] : [
        ...state.items.slice(0, action.to),
        state.items[action.from],
        ...state.items.slice(action.to, action.from),
        ...state.items.slice(action.from + 1)
      ]
    }

  default:
    return state
  }

}

export default reducer
