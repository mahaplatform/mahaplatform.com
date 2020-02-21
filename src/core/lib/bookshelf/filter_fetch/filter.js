import { getAlias } from './utils'
import moment from 'moment'
import _ from 'lodash'

export const parseFilter = (options) => {
  if(!options.filter || !options.filter.params) return null
  const filter = normalizeFilter(options.filter.params, options)
  return applyFilter(filter, options)
}

const normalizeFilter = (filters, options) => {
  const $filters = andFilters(filters)
  return {
    $and: [
      ...$filters.$and,
      ...filters.q ? [{ q: filters.q }] : []
    ]
  }
}

const andFilters = (filters) => {
  if(_.isPlainObject(filters) && !filters.$and) {
    return {
      $and: Object.keys(filters).map(key => ({
        [key]: filters[key]
      }))
    }
  }
  if(_.isArray(filters)) {
    return { $and: filters }
  }
  return filters
}

const applyFilter = (filter, options) => {
  const column = Object.keys(filter)[0]
  const fn = _.includes(['$and','$or'], column) ? applyConjunction : applyCriteria
  return fn(column, filter[column], options)
}

const applyConjunction = (conjunction, conditions, options) => {
  const output = conditions.reduce((segments, segment) => {
    const filtered = applyFilter(segment, options)
    return {
      joins: [
        ...segments.joins,
        ...filtered.joins
      ],
      query: [
        ...segments.query,
        filtered.query
      ],
      bindings: [
        ...segments.bindings,
        ...filtered.bindings
      ]
    }
  }, { joins: [], query: [], bindings: [] })
  return {
    joins: output.joins,
    query: `(${output.query.join(` ${conjunction.replace('$', '')} `)})`,
    bindings: output.bindings
  }
}

const applyCriteria = (column, condition, options) => {
  const operation = Object.keys(condition)[0]
  const value = condition[operation]
  const alias = getAlias(column, options.filter.aliases, options)
  if(options.filter.operations && options.filter.operations[operation]) {
    return options.filter.operations[operation](alias.table, alias.alias, value)
  }
  const { query, bindings } = getFilter(alias, operation, value)
  const joins = getJoin(alias)
  return { joins, query, bindings }
}

const getJoin = ({ table, alias, column, join }) => {
  if(!join) return []
  const conditions = join.conditions.map(condition => {
    return `${castColumn({ table, alias, column: condition[0] })}=${condition[1]}`
  }).join(' and ')
  return [`${join.type} join "${table}" "${alias}" on ${conditions}`]
}

const castColumn = ({ table, alias, column, join }) => {
  return `"${alias || table}"."${column}"`
}

const getFilter = (alias, operation, value) => {
  if(alias.column === 'q') return getFilterSearch(alias.column, value)
  const column = castColumn(alias)
  if(operation === '$nl') return getFilterNull(column, value)
  if(operation === '$nnl') return getFilterNotNull(column, value)
  if(operation === '$kn') return getFilterKnown(column, value)
  if(operation === '$nkn') return getFilterNotKnown(column, value)
  if(operation === '$eq') return getFilterEqual(column, value)
  if(operation === '$neq') return getFilterNotEqual(column, value)
  if(operation === '$lk') return getFilterLike(column, value)
  if(operation === '$nlk') return getFilterNotLike(column, value)
  if(operation === '$ct') return getFilterContains(column, value)
  if(operation === '$in') return getFilterIn(column, value)
  if(operation === '$nin') return getFilterNotIn(column, value)
  if(operation === '$lt') return getFilterLessThan(column, value)
  if(operation === '$lte') return getFilterLessThanEqualTo(column, value)
  if(operation === '$gt') return getFilterGreaterThan(column, value)
  if(operation === '$gte') return getFilterGreaterThanEqualTo(column, value)
  if(operation === '$dr') return getFilterDateRange(column, value)
}

const getFilterSearch = (column, value) => ({
  query: '1=1',
  bindings: []
})

const getFilterNull = (column, value) => ({
  query: `${column} is null`,
  bindings: []
})

const getFilterNotNull = (column, value) => ({
  query: `${column} is not null`,
  bindings: []
})

const getFilterTrue = (column, value) => ({
  query: `${column} = ?`,
  bindings: [true]
})

const getFilterFalse = (column, value) => ({
  query: `${column} = ?`,
  bindings: [false]
})

const getFilterKnown = (column, value) => ({
  query: `(${column} is null or column != ?)`,
  bindings: ['']
})

const getFilterNotKnown = (column, value) => ({
  query: `(${column} is null or column = ?)`,
  bindings: ['']
})

const getFilterCaseInsensitive = (column, value) => ({
  query: `lower(${column}::varchar) = ?`,
  bindings: [value.toLowerCase()]
})

const getFilterEqual = (column, value) => {
  if(value === 'null') return getFilterNull(column, value)
  if(value === 'not_null') return getFilterNotNull(column, value)
  if(`${value}` === 'true') return getFilterTrue(column, value)
  if(`${value}` === 'false') return getFilterFalse(column, value)
  if(!/^\d+$/.test(value)) return getFilterCaseInsensitive(column, value)
  return {
    query: `${column} = ?`,
    bindings: [value]
  }
}

const getFilterNotEqual = (column, value) => {
  if(value === 'null') return getFilterNotNull(column, value)
  if(value === 'not_null') return getFilterNull(column, value)
  if(`${value}` === 'true') return getFilterFalse(column, value)
  if(`${value}` === 'false') return getFilterTrue(column, value)
  if(!/^\d+$/.test(value)) return getFilterCaseInsensitive(column, value)
  return {
    query: `${column} = ?`,
    bindings: [value]
  }
}

const getFilterLike = (column, value) => ({
  query: `lower(${column}) like ?`,
  bindings: [`%${value.toLowerCase()}%`]
})

const getFilterNotLike = (column, value) => ({
  query: `lower(${column}) not like ?`,
  bindings: [`%${value.toLowerCase()}%`]
})

const getFilterContains = (column, value) => ({
  query: `${column} @> ?`,
  bindings: [value]
})

const getFilterIn = (column, value) => {
  const bindings = _.without(value, 'null')
  const markers = Array(bindings.length).fill(0).map(i => '?').join(',')
  return {
    query: _.includes(value, 'null') ? `(${column} in (${markers}) or ${column} is null)` : `${column} in (${markers})`,
    bindings: _.without(value, 'null')
  }
}

const getFilterNotIn = (column, value) => {
  const bindings = _.without(value, 'null')
  const markers = Array(bindings.length).fill(0).map(i => '?').join(',')
  return {
    query: _.includes(value, 'null') ? `(${column} not in (${markers}) or ${column} is not null)` : `${column} not in (${markers})`,
    bindings: _.without(value, 'null')
  }
}

const getFilterLessThan = (column, value) => ({
  query: `${column} < ?`,
  bindings: [value]
})

const getFilterLessThanEqualTo = (column, value) => ({
  query: `${column} <= ?`,
  bindings: [value]
})

const getFilterGreaterThan = (column, value) => ({
  query: `${column} > ?`,
  bindings: [value]
})

const getFilterGreaterThanEqualTo = (column, value) => ({
  query: `${column} >= ?`,
  bindings: [value]
})

const getFilterDateRange = (column, value) => {
  ['week','month','quarter','year'].map(period => {
    ['this','last','next'].map((article, index) => {
      if(value === `${article}_${period}`) {
        return getFilterRange(column, index - 1, period)
      }
    })
  })
  ['30','60','90'].map(duration => {
    ['last','next'].map((article, index) => {
      if(value === `${article}_${duration}`) {
        return getFilterDuration(column, 30 - (60 * index), 'days')
      }
    })
  })
  if(value === 'ytd') return getFilterBetween(column, moment().startOf('year'), moment())
  if(value === 'ltd') return getFilterBetween(column, moment('2000-01-01'), moment())
}

const getFilterRange = (column, quantity, unit) => {
  const start = moment().add(quantity, unit).startOf(unit)
  const end = moment().add(quantity, unit).endOf(unit)
  return getFilterBetween(column, start, end)
}

const getFilterDuration = (column, quantity, unit) => {
  const start = quantity > 0 ? moment().startOf(unit) : moment().add(quantity, unit).endOf(unit)
  const end = quantity > 0 ? moment().add(quantity, unit).endOf(unit) : moment().startOf(unit)
  return getFilterBetween(column, start, end)
}

const getFilterBetween = (column, start, end) => ({
  query: `${column} >= ? and ${column} <= ?`,
  bindings: [
    start.format('YYYY-MM-DD'),
    end.format('YYYY-MM-DD')
  ]
})
