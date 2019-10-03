import { createSelector } from 'reselect'
import _ from 'lodash'

const unfiltered = (state, props) => props.records || []

const stars = (state, props) => state.maha.stars.stars

export const records = createSelector(
  unfiltered,
  stars,
  (records, stars) => records.filter(record => {
    return _.get(stars, `drive_${record.type}s[${record.item_id}]`) !== false
  })
)

export const all = createSelector(
  records,
  (records) => records.length
)

export const total = createSelector(
  records,
  (records) => records.length
)
