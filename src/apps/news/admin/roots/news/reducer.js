export const INITIAL_STATE = {
  added_posts: [],
  removed_posts: [],
  liker_ids: {}
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'ADD_POST':
    return {
      ...state,
      added_posts: [
        ...state.added_posts,
        action.post
      ]
    }

  case 'UPDATE_LIKER_IDS':
    return {
      ...state,
      liker_ids: {
        ...state.liker_ids,
        [action.post_id]: action.liker_ids
      }
    }

  case 'REMOVE_POST':
    return {
      ...state,
      removed_posts: [
        ...state.added_posts,
        action.post_id
      ]
    }

  default:
    return state

  }

}

export default reducer
