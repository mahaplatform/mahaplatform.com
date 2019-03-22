export const setTyping = (typing) => ({
  type: 'SET_TYPING',
  typing
})

export const showMore = () => ({
  type: 'SHOW_MORE'
})

export const type = (q) => ({
  type: 'TYPE',
  q
})

export const set = (comments) => ({
  type: 'SET',
  comments
})

export const fetch = (endpoint) => ({
  type: 'API_REQUEST',
  method: 'GET',
  endpoint,
  request: 'FETCH_REQUEST',
  success: 'FETCH_SUCCESS',
  failure: 'FETCH_FAILURE'
})

export const create = (endpoint, comment) => ({
  type: 'API_REQUEST',
  method: 'POST',
  endpoint,
  body: {
    asset_ids: comment.asset_ids,
    text: comment.text,
    uid: comment.uid,
    quoted_comment_id: comment.quoted_comment_id
  },
  meta: { comment },
  request: 'CREATE_REQUEST',
  success: 'CREATE_SUCCESS',
  failure: 'CREATE_FAILURE'
})

export const add = (comment) => ({
  type: 'ADD',
  comment
})

export const quoteComment = (id) => ({
  type: 'QUOTE_COMMENT',
  id
})

export const remove = (uid) => ({
  type: 'REMOVE',
  uid
})
