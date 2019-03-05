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

const name = (state, props) => props.name

const typesName = (state, props) => props.typesName

const q = (state, props) => state.q.toLowerCase()

const text = (state, props) => props.text

const filtered = createSelector(
  unfiltered,
  q,
  text,
  (unassigned, q, text) => ({
    status: unassigned.status,
    records: unassigned.records.filter(record => {
      if(q.length === 0) return true
      return record[text].toLowerCase().search(q) >= 0
    })
  })
)

export const unassigned = createSelector(
  filtered,
  assigned,
  name,
  (filtered, assigned, name) => ({
    status: filtered.status,
    records: filtered.records.filter(record => {
      return _.findIndex(assigned.records, { [name]: { id: record.id } }) < 0
    })
  })
)

export const ids = createSelector(
  assigned,
  (assigned) => assigned.records.map(item => item.id)
)

export const values = createSelector(
  assigned,
  name,
  typesName,
  (assigned, name, typesName) => assigned.records.reduce((values, assignee) => [
    ...values,
    {
      [`${name}_id`]: assignee[name].id,
      [typesName]: assignee[typesName]
    }
  ], [])
)
