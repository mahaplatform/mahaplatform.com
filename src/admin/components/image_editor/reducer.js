const INITIAL_STATE = {
  mode: null,
  ratio: null,
  transforms: [
    { key: 'crop', value: '10,10,940,700'}
  ],
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

  case 'SET_MODE':
    return {
      ...state,
      mode: action.mode
    }

  case 'SET_RATIO':
    return {
      ...state,
      ratio: action.ratio
    }

  default:
    return state
  }

}

export default reducer
