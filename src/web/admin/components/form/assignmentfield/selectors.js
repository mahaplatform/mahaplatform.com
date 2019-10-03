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
    return record.full_name.toLowerCase().search(q) >= 0
  })
)

export const assigned = createSelector(
  assignments,
  unfiltered,
  (assignments, unassigned) => assignments.map(({ grouping_id, user_id, group_id }) => ({
    ...grouping_id ? unassigned.find(assignee => assignee.grouping_id === grouping_id) : {},
    ...group_id ? unassigned.find(assignee => assignee.group_id === group_id) : {},
    ...user_id ? unassigned.find(assignee => assignee.user_id === user_id) : {}
  }))
)

export const unassigned = createSelector(
  filtered,
  assignments,
  (filtered, assignments) => filtered.filter(record => {
    if(record.grouping_id) return _.findIndex(assignments, { grouping_id: record.grouping_id }) < 0
    if(record.user_id) return _.findIndex(assignments, { user_id: record.user_id }) < 0
    if(record.group_id) return _.findIndex(assignments, { group_id: record.group_id }) < 0
  })

)
