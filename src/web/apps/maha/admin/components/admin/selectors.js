import { createSelector } from 'reselect'

const user = (state, props) => state.user || {}

export const user_id = createSelector(
  user,
  (user) => user.id || null
)
