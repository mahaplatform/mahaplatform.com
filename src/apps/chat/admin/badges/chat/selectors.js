import { createSelector } from 'reselect'

const unread = (state, props) => state.chat.root.unread

export const count = createSelector(
  unread,
  (unread) => Object.values(unread).reduce((total, count) => {
    return total + (count || 0)
  }, 0))
