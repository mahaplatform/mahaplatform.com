export const INITIAL_STATE = {
  sources: [],
  profiles: [],
  url: null
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'FETCH_SOURCES_SUCCESS':
    return {
      ...state,
      sources: action.result.data
    }

  case 'FETCH_PROFILES_SUCCESS':
    return {
      ...state,
      profiles: action.result.data,
      url: null
    }

  case 'AUTHORIZE_SUCCESS':
    return {
      ...state,
      url: action.result.data
    }

  default:
    return state
  }

}

export default reducer
