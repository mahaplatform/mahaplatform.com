import { createSelector } from 'reselect'
import _ from 'lodash'

const quoted_comment_id = (state, props) => state.quoted_comment_id

const unsorted = (state, props) => state.comments

const hidden = (state, props) => state.hidden

export const comments = createSelector(
  unsorted,
  hidden,
  (comments, hidden) => comments.sort((a,b) => {
    if(a.created_at > b.created_at) return 1
    if(a.created_at < b.created_at) return -1
    return 0
  }).filter((comment, index) => {
    return (index >= hidden)
  }))

export const quoted_comment = createSelector(
  comments,
  quoted_comment_id,
  (comments, id) => _.find(comments, { id })
)
