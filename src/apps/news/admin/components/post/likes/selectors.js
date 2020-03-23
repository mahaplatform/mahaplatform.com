import { createSelector } from 'reselect'

const post_id = (state, props) => props.post_id

const provided_ids = (state, props) => props.liker_ids

const root_ids = (state, props) => state.news.root.liker_ids

const updated_ids = createSelector(
  post_id,
  root_ids,
  (post_id, root_ids) => {
    return root_ids[post_id] || null
  }
)

export const liker_ids = createSelector(
  post_id,
  provided_ids,
  updated_ids,
  (post_id, provided_ids, updated_ids) => {
    return updated_ids || provided_ids
  }
)
