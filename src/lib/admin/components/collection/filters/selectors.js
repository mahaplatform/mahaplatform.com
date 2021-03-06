import { createSelector } from 'reselect'
import _ from 'lodash'

const filtersSelector = (state, props) => props.filters

const resultsSelector = (state, props) => state.results

export const filtered = createSelector(
  filtersSelector,
  resultsSelector,
  (filters, results) => ({
    $and: Object.keys(results).reduce((filtered, key) => [
      ...filtered,
      { [key]: _getValue(filters, results, key) }
    ], [])
  })
)

const _getValue = (filters, results, key) => {
  const field = _.find(filters, { name: key })
  if(!field) return null
  const value = results[key]
  if(field.type === 'daterange') return { $dr: value }
  if(_.isArray(value)) return { $in: value }
  if(_.isPlainObject(value)) return { $eq: value.key }
  return { $eq: value }
}
