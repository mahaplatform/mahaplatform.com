import _ from 'lodash'

export const parseSort = (options) => {
  if(!options.sort || !options.sort.params) return null
  const sort = normalizeSort(options.sort.params, options)
  return applySort(sort, options)
}

const normalizeSort = ($sorts, options) => {
  const sorts = $sorts || options.sort.defaults || 'id'
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
    return `${column} ${order}`
  })
}
