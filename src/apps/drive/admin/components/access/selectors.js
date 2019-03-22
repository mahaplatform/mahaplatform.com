import { createSelector } from 'reselect'
import _ from 'lodash'

const unfiltered = (state, props) => ({
  status: state.unassigned.status,
  records: state.unassigned.records || []
})

const assigned = (state, props) => ({
  status: state.assigned.status,
  records: state.assigned.records || []
})

const q = (state, props) => state.q.toLowerCase()

const filtered = createSelector(
  unfiltered,
  q,
  (unassigned, q) => ({
    status: unassigned.status,
    records: unassigned.records.filter(record => {
      if(q.length === 0) return true
      if(record.user) return record.user.full_name.toLowerCase().search(q) >= 0
      if(record.group) return record.group.title.toLowerCase().search(q) >= 0
      return record.name.toLowerCase().search(q) >= 0    })
  })
)

export const unassigned = createSelector(
  filtered,
  assigned,
  (filtered, assigned) => ({
    status: filtered.status,
    records: filtered.records.filter(record => {
      return _.findIndex(assigned.records, {
        is_everyone: record.is_everyone,
        user: record.user ? { id: record.user.id }: null,
        group: record.group ? { id: record.group.id }: null
      }) < 0
    })
  })
)
