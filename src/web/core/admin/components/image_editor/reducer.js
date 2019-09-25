import _ from 'lodash'

const INITIAL_STATE = {
  asset: null,
  cropping: false,
  ratio: null,
  transforms: {},
  status: 'pending'
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_REQUEST':
    return {
      ...state,
      status: 'loading'
    }

  case 'FETCH_FAILURE':
    return {
      ...state,
      status: 'failed'
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      status: 'loaded',
      asset: action.result.data
    }

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

  case 'ADJUST':
    return {
      ...state,
      transforms: {
        ...state.transforms,
        [action.key]: action.value
      }
    }

  case 'SET':
    return {
      ...state,
      transforms: action.transforms
    }

  case 'CROP':
    return {
      ...state,
      cropping: action.cropping
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
