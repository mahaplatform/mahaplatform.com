import _ from 'lodash'

const andFilters = (filters) => {
  if(_.isPlainObject(filters) && !filters.$and && !filters.$or) return {
    $and: Object.keys(filters).map(key => ({
      [key]: filters[key]
    }))
  }
  if(_.isArray(filters)) return { $and: filters }
  return filters
}

const normalizeFilters = (filters) => {
  const $filters = andFilters(filters)
  return {
    $and: [
      ...$filters.$and,
      ...filters.q ? [{ q: filters.q }] : []
    ]
  }
}

export const getFilterFields = ($filters) => {
  const filters = normalizeFilters($filters)
  return filters.$and.reduce((fields, filter) => {
    const field = Object.keys(filter)[0]
    return {
      ...fields,
      ..._.includes(['$and','$or'], field) ? getFilterFields(filter) : { [field]: true }
    }
  }, {})
}
