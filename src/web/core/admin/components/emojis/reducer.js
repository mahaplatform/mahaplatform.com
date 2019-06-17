export const INITIAL_STATE = {
  changing: false,
  skinToneIndex: null,
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CHANGE_SKIN_TONE':
    return {
      ...state,
      changing: true
    }

  case 'LOAD_SKIN_TONE_SUCCESS':
    return {
      ...state,
      skinToneIndex: action.value,
      status: 'loaded'
    }

  case 'SAVE_SKIN_TONE_SUCCESS':
    return {
      ...state,
      changing: false,
      skinToneIndex: action.value
    }

  default:
    return state

  }

}

export default reducer
