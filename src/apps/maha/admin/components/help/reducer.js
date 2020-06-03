export const INITIAL_STATE = {
  q: '',
  articles: []
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'CLOSE':
    return {
      ...state,
      articles: [
        ...state.articles.slice(0, -1)
      ]
    }

  case 'TYPE':
    return {
      ...state,
      q: action.q
    }

  case 'FETCH_SUCCESS':
    return {
      ...state,
      articles: [
        ...state.articles,
        action.result.data
      ]
    }

  default:
    return state

  }
}
