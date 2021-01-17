const INITIAL_STATE = {
  transforms: [],
  undone: [],
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SAVE_REQUEST':
    return {
      ...state,
      status: 'saving'
    }

  case 'SAVE_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'SAVE_SUCCESS':
    return {
      ...state,
      status: 'saveed'
    }

  case 'POP_TRANSFORM':
    return {
      ...state,
      transforms: [
        ...state.transforms.slice(0, -1)
      ]
    }

  case 'PUSH_TRANSFORM':
    return {
      ...state,
      transforms: [
        ...state.transforms,
        { key: action.key, value: action.value }
      ],
      undone: []
    }

  case 'RESET':
    return {
      ...state,
      transforms: [],
      undone: []
    }

  case 'UNDO':
    return {
      ...state,
      transforms: [
        ...state.transforms.slice(0, -1)
      ],
      undone: [
        ...state.undone,
        ...state.transforms.slice(-1)
      ]
    }

  case 'REDO':
    return {
      ...state,
      transforms: [
        ...state.transforms,
        ...state.undone.slice(-1)
      ],
      undone: [
        ...state.undone.slice(0, -1)
      ]
    }

  case 'SET':
    return {
      ...state,
      transforms: action.transforms
    }

  default:
    return state
  }

}

export default reducer
