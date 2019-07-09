import { createSelector } from 'reselect'
import _ from 'lodash'

const assignments = (state, props) => state.assignments

const unfiltered = (state, props) => state.unassigned

const q = (state, props) => state.q.toLowerCase()

const filtered = createSelector(
  unfiltered,
  q,
  (unfiltered, q) => unfiltered.filter(record => {
    if(q.length === 0) return true
    const blob = [_.get(record, 'user.full_name'), _.get(record, 'group.title')].join(' ')
    return blob.toLowerCase().search(q) >= 0
  })
)

export const assigned = createSelector(
  assignments,
  unfiltered,
  (assignments, unassigned) => assignments.map(({ user_id, group_id, is_everyone }) => ({
    ...group_id ? unassigned.find(assignee => assignee.group && assignee.group.id === group_id) : {},
    ...user_id ? unassigned.find(assignee => assignee.user && assignee.user.id === user_id) : {},
    is_everyone
  }))
)

export const unassigned = createSelector(
  filtered,
  assignments,
  (filtered, assignments) => filtered.filter(record => {
    if(record.user) return _.findIndex(assignments, { user_id: record.user.id }) < 0
    if(record.group) return _.findIndex(assignments, { group_id: record.group.id }) < 0
    if(record.is_everyone) return _.findIndex(assignments, { is_everyone: true }) < 0
  })

)
