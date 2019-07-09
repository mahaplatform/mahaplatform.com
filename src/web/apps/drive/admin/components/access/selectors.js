import { createSelector } from 'reselect'
import _ from 'lodash'

const assignments = (state, props) => ({
  status: state.assigned.status,
  records: state.assigned.records || []
})

const unfiltered = (state, props) => ({
  status: state.unassigned.status,
  records: state.unassigned.records || []
})

const q = (state, props) => state.q.toLowerCase()

const filtered = createSelector(
  unfiltered,
  q,
  (unassigned, q) => ({
    status: unassigned.status,
    records: unassigned.records.filter(record => {
      if(q.length === 0) return true
      return record.full_name.toLowerCase().search(q) >= 0
    })
  })
)

export const assigned = createSelector(
  assignments,
  unfiltered,
  (assignments, unassigned) => ({
    status: assignments.status,
    records: assignments.records.map(({ user_id, group_id, is_everyone, access_type_id, is_revoked }) => ({
      ...group_id ? unassigned.records.find(assignee => assignee.group_id === group_id) : {},
      ...user_id ? unassigned.records.find(assignee => assignee.user_id === user_id) : {},
      ...is_everyone ? unassigned.records.find(assignee => assignee.is_everyone) : {},
      access_type_id,
      is_revoked
    }))
  })
)

export const unassigned = createSelector(
  filtered,
  assignments,
  (filtered, assignments) => ({
    status: filtered.status,
    records: filtered.records.filter(record => {
      if(record.user_id) return _.findIndex(assignments.records, { user_id: record.user_id }) < 0
      if(record.group_id) return _.findIndex(assignments.records, { group_id: record.group_id }) < 0
      if(record.is_everyone) return _.findIndex(assignments.records, { is_everyone: true }) < 0
    })
  })
)
