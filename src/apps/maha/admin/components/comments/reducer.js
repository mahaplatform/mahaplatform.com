const INITIAL_STATE = {
  comments: [],
  editing: null,
  q: '',
  q_saved: '',
  status: 'pending',
  typing: null,
  hidden: 0
}

const reducer = (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case 'SET':
    return {
      ...state,
      comments: action.comments,
      status: 'loaded'
    }

  case 'SET_TYPING':
    return {
      ...state,
      typing: action.typing
    }

  case 'SHOW_MORE':
    return {
      ...state,
      hidden: 0
    }

  case 'TYPE':
    return {
      ...state,
      q: action.q
    }

  case 'BEGIN_EDIT':
    return {
      ...state,
      editing: action.uid,
      q: action.q
    }

  case 'CANCEL_EDIT':
    return {
      ...state,
      editing: null,
      q: ''
    }

  case 'CREATE_REQUEST':
    return {
      ...state,
      q: '',
      q_saved: state.q,
      quoted_comment_id: null,
      comments: [
        ...state.comments,
        action.comment
      ]
    }

  case 'CREATE_FAILURE':
    return {
      ...state,
      q: state.q_saved,
      q_saved: '',
      comments: [
        ...state.comments.filter(comment => comment.uid !== action.comment.uid)
      ]
    }

  case 'CREATE_SUCCESS':
    return {
      ...state,
      q: '',
      q_saved: ''
    }

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
      comments: action.result.data,
      hidden: action.result.data.length - 4
    }

  case 'UPDATE_REQUEST':
    return {
      ...state,
      editing: null,
      q: '',
      q_saved: state.q,
      comments: [
        ...state.comments.map(comment => {
          if(comment.uid !== action.comment.uid) return comment
          return {
            ...comment,
            q_saved: action.comment.text,
            updated_at: action.comment.updated_at
          }
        })
      ]
    }

  case 'UPDATE_FAILURE':
    return {
      ...state,
      editing: action.comment.uid,
      q: state.q_saved,
      q_saved: '',
      comments: [
        ...state.comments.map(comment => {
          if(comment.uid !== action.comment.uid) return comment
          return {
            ...comment,
            q_saved: state.q
          }
        })
      ]
    }

  case 'UPDATE_SUCCESS':
    return {
      ...state,
      q: '',
      q_saved: ''
    }

  case 'DESTROY_REQUEST':
    return {
      ...state,
      comments: [
        ...state.comments.filter(comment => comment.uid !== action.comment.uid)
      ]
    }

  case 'ADD':
    return {
      ...state,
      comments: [
        ...state.comments.filter(comment => comment.uid !== action.comment.uid),
        action.comment
      ]
    }

  case 'REPLACE':
    return {
      ...state,
      comments: [
        ...state.comments.map(comment => (comment.uid !== action.comment.uid) ? comment : action.comment)
      ]
    }

  case 'REMOVE':
    return {
      ...state,
      comments: [
        ...state.comments.filter(comment => comment.uid !== action.uid)
      ]
    }

  case 'QUOTE_COMMENT':
    return {
      ...state,
      quoted_comment_id: action.id
    }

  default:
    return state
  }

}

export default reducer
