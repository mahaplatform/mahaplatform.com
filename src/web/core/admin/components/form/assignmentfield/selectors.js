import { createSelector } from 'reselect'

const collapsed = (state, props) => state.assignments

const unassigned = (state, props) => state.unassigned

export const assignments = createSelector(
  collapsed,
  unassigned,
  (assignments, unassigned) => assignments.map(({ user_id, group_id, is_everyone }) => ({
    ...group_id ? unassigned.find(assignee => assignee.group && assignee.group.id === group_id) : {},
    ...user_id ? unassigned.find(assignee => assignee.user && assignee.user.id === user_id) : {},
    is_everyone
  }))
)
