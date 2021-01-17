const INITIAL_STATE = {
  transforms: [],
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
        ...state.transforms.filter((transform, index) => {
          return index !== state.transforms.length - 1
        })
      ]
    }

  case 'PUSH_TRANSFORM':
    return {
      ...state,
      transforms: [
        ...state.transforms,
        { key: action.key, value: action.value }
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
