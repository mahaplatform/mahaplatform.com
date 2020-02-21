import _ from 'lodash'

export const parseSort = (options) => {
  const { params } = options.sort
  const filter = normalizeFilter(params, options)
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

export const applySort = (sort, options) => {
  if(sorts.length === 0) return
  sorts.map(sort => {
    const { column, order } = applySort(sort, options)
    qb.orderByRaw(`${column} ${order}`)
  })
}
