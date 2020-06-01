import { castColumn, getAlias } from './utils'
import _ from 'lodash'

export const parseSort = (options) => {
  if(!options.sort) return null
  const sort = normalizeSort(options.sort.params, options)
  return applySort(sort, options)
}

const normalizeSort = (params, options) => {
  const sorts = params || options.sort.defaults || 'id'
  return _.castArray(sorts).map(sort => {
    if(!_.isString(sort)) return sort
    return {
      column: sort.replace(/^-/, ''),
      order: sort[0] === '-' ? 'desc' : 'asc'
    }
  }).filter(sort => !_.isNil(sort.column))
}

export const applySort = (sorts, options) => {
  if(sorts.length === 0) return []
  return sorts.map(sort => {
    const { column, order } = sort
    const alias = getAlias(column, options.aliases, options)
    if(alias.key) {
      return `${castColumn(alias)}->'${alias.key}'->>0 ${order}`
    } else  {
      return `${castColumn(alias)} ${order}`
    }
  })
}
