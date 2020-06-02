import { castColumn, getAlias } from './utils'
import moment from 'moment'
import _ from 'lodash'

export const parseFilter = (options) => {
  if(!options.filter || !options.filter.params) return null
  const filter = normalizeFilter(options.filter.params)
  return applyFilter(filter, options)
}

const normalizeFilter = ($filters) => {
  const filters = andFilters($filters)
  const q = $filters.q
  return {
    $and: [
      ...filters.$and.filter(filter => {
        return Object.keys(filter)[0] !== 'q'
      }),
      ...q ? [{ q: { $sq: q } }] : []
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
        ...filtered.joins || []
      ],
      query: [
        ...segments.query,
        filtered.query
      ],
      bindings: [
        ...segments.bindings,
        ...filtered.bindings || []
      ]
    }
  }, { joins: [], query: [], bindings: [] })
  const query = output.query.filter(segment => {
    return !_.isNil(segment)
  }).join(` ${conjunction.replace('$', '')} `)
  return {
    joins: output.joins,
    query: query.length > 0 ? `(${query})` : null,
    bindings: output.bindings
  }
}

const applyCriteria = (column, condition, options) => {
  const operation = Object.keys(condition)[0]
  const value = condition[operation]
  const alias = getAlias(column, options.aliases, options)
  if(alias.join) {
    const { conditions } = alias.join
    if(operation === '$jeq') return applyJeq(alias.table, alias.alias, alias.column, value, conditions)
    if(operation === '$njeq') return applyNjeq(alias.table, alias.alias, alias.column, value, conditions)
    if(operation === '$jin') return applyJin(alias.table, alias.alias, alias.column, value, conditions)
    if(operation === '$njin') return applyNjin(alias.table, alias.alias, alias.column, value, conditions)
    if(options.filter.operations && options.filter.operations[operation]) {
      return applyOperation(alias, operation, value, conditions, options)
    }
  }
  console.log(alias, operation)

  const { query, bindings } = getFilter(alias, operation, value, options)
  const joins = getJoin(alias)
  return { joins, query, bindings }
}

const applyOperation = (alias, operation, value, conditions, options)=> {
  const criteria = options.filter.operations[operation](alias.table, alias.alias, alias.column, value, ...conditions[0])
  return {
    joins: [criteria.join],
    query: criteria.query,
    bindings: criteria.bindings
  }
}

const applyJeq = (table, alias, column, value, conditions) => {
  const criteria = conditions.map((condition) => {
    const [foreign_key, primary_key] = condition
    return `${alias}.${foreign_key}=${primary_key}`
  }).join(' and ')
  return {
    joins: [[`left join ${table} ${alias} on ${criteria} and ${alias}.${column}=?`, value]],
    query: `${alias}.${column} is not null`
  }
}

const applyNjeq = (table, alias, column, value, conditions) => {
  const criteria = conditions.map((condition) => {
    const [foreign_key, primary_key] = condition
    return `${alias}.${foreign_key}=${primary_key}`
  }).join(' and ')
  return {
    joins: [[`left join ${table} ${alias} on ${criteria} and ${alias}.${column}=?`, value]],
    query: `${alias}.${column} is null`
  }
}

const applyJin = (table, alias, column, value, conditions) => {
  const markers = Array(value.length).fill(0).map(i => '?').join(',')
  const criteria = conditions.map((condition) => {
    const [foreign_key, primary_key] = condition
    return `${alias}.${foreign_key}=${primary_key}`
  }).join(' and ')
  return {
    joins: [[`left join ${table} ${alias} on ${criteria} and ${alias}.${column} in (${markers})`, ...value]],
    query: `${alias}.${column} is not null`
  }
}

const applyNjin = (table, alias, column, value, conditions) => {
  const markers = Array(value.length).fill(0).map(i => '?').join(',')
  const criteria = conditions.map((condition) => {
    const [foreign_key, primary_key] = condition
    return `${alias}.${foreign_key}=${primary_key}`
  }).join(' and ')
  return {
    joins: [[`left join ${table} ${alias} on ${criteria} and ${alias}.${column} in (${markers})`, ...value]],
    query: `${alias}.${column} is null`
  }
}

const getJoin = ({ table, alias, column, join }) => {
  if(!join) return []
  const conditions = join.conditions.map(condition => {
    return `${castColumn({ table, alias, column: condition[0] })}=${condition[1]}`
  }).join(' and ')
  return [`${join.type} join "${table}" "${alias}" on ${conditions}`]
}

const getFilter = (alias, operation, value, options) => {
  const column = castColumn(alias)
  if(operation === '$sq') return getFilterSearch(alias, value, options)
  if(operation === '$nl') return getFilterNull(column, alias, value)
  if(operation === '$nnl') return getFilterNotNull(column, alias, value)
  if(operation === '$kn') return getFilterKnown(column, alias, value)
  if(operation === '$nkn') return getFilterNotKnown(column, alias, value)
  if(operation === '$eq') return getFilterEqual(column, alias, value)
  if(operation === '$neq') return getFilterNotEqual(column, alias, value)
  if(operation === '$lk') return getFilterLike(column, alias, value)
  if(operation === '$nlk') return getFilterNotLike(column, alias, value)
  if(operation === '$ct') return getFilterContains(column, alias, value)
  if(operation === '$in') return getFilterIn(column, alias, value)
  if(operation === '$nin') return getFilterNotIn(column, alias, value)
  if(operation === '$lt') return getFilterLessThan(column, alias, value)
  if(operation === '$lte') return getFilterLessThanEqualTo(column, alias, value)
  if(operation === '$gt') return getFilterGreaterThan(column, alias, value)
  if(operation === '$gte') return getFilterGreaterThanEqualTo(column, alias, value)
  if(operation === '$dr') return getFilterDateRange(column, alias, value, false)
  if(operation === '$ndr') return getFilterDateRange(column, alias, value, true)
}

const getFilterSearch = (column, value, options) => {
  if(!options.filter.search || value.length === 0) return { query: null }
  const columns = options.filter.search.map(searchColumn => {
    const alias = getAlias(searchColumn, options.aliases, options)
    const cast = castColumn(alias)
    return alias.key ? `${cast}->'${alias.key}'->>0` : cast
  })
  return {
    query: `lower(concat(${columns.join(',\' \',')})) like ?`,
    bindings: [`%${value.toLowerCase()}%`]
  }
}

const getFilterNull = (column, alias, value) => ({
  query: alias.key ? `${column}->'${alias.key}'->>0 is null` : `${column} is null`,
  bindings: []
})

const getFilterNotNull = (column, alias, value) => ({
  query: alias.key ? `${column}->'${alias.key}'->>0 is not null` : `${column} is not null`,
  bindings: []
})

const getFilterTrue = (column, alias, value) => ({
  query: alias.key ? `(${column}->'${alias.key}'->>0)::boolean = ?` : `${column} = ?`,
  bindings: [true]
})

const getFilterFalse = (column, alias, value) => ({
  query: alias.key ? `(${column}->'${alias.key}'->>0)::boolean = ?` : `${column} = ?`,
  bindings: [false]
})

const getFilterKnown = (column, alias, value) => {
  if(alias.key) {
    return {
      query: `${column} \\? '${alias.key}' and (${column}->'${alias.key}'->>0 is not null and ${column}->'${alias.key}'->>0 != ?)`,
      bindings: ['']
    }
  } else {
    return {
      query: `${column} is not null and ${column} != ?`,
      bindings: ['']
    }
  }
}

const getFilterNotKnown = (column, alias, value) =>{
  if(alias.key) {
    return {
      query: `not(${column} \\? '${alias.key}') or ${column}->'${alias.key}'->>0 is null or ${column}->'${alias.key}'->>0 = ?`,
      bindings: ['']
    }
  } else {
    return {
      query: `${column} is null or ${column} = ?`,
      bindings: ['']
    }
  }
}

const getFilterEqual = (column, alias, value) => {
  if(value === 'null') return getFilterNull(column, alias, value)
  if(value === 'not_null') return getFilterNotNull(column, alias, value)
  if(`${value}` === 'true') return getFilterTrue(column, alias, value)
  if(`${value}` === 'false') return getFilterFalse(column, alias, value)
  if(!/^\d+$/.test(value)) value = value.toLowerCase()
  if(alias.key) {
    return {
      query: `lower(${column}->'${alias.key}'->>0) = ?`,
      bindings: [value]
    }
  } else {
    return {
      query: `lower(${column}::varchar) = ?`,
      bindings: [value]
    }
  }
}

const getFilterNotEqual = (column, alias, value) => {
  if(value === 'null') return getFilterNotNull(column, value)
  if(value === 'not_null') return getFilterNull(column, value)
  if(`${value}` === 'true') return getFilterFalse(column, value)
  if(`${value}` === 'false') return getFilterTrue(column, value)
  if(!/^\d+$/.test(value)) value = value.toLowerCase()
  if(alias.key) {
    return {
      query: `not(${column} \\? '${alias.key}') or ${column}->'${alias.key}'->>0 is null or lower(${column}->'${alias.key}'->>0) != ?`,
      bindings: [value]
    }
  } else {
    return {
      query: `lower(${column}::varchar) != ?`,
      bindings: [value]
    }
  }
}

const getFilterLike = (column, alias, value) => {
  const term = `%${value.toLowerCase()}%`
  if(alias.key) {
    return {
      query: `lower(${column}->'${alias.key}'->>0) like ?`,
      bindings: [term]
    }
  } else {
    return {
      query: `lower(${column}::varchar) like ?`,
      bindings: [term]
    }
  }
}

const getFilterNotLike = (column, alias, value) => {
  const term = `%${value.toLowerCase()}%`
  if(alias.key) {
    return {
      query: `not(${column} \\? '${alias.key}') or ${column}->'${alias.key}'->>0 is null or lower(${column}->'${alias.key}'->>0) not like ?`,
      bindings: [term]
    }
  } else {
    return {
      query: `lower(${column}::varchar) not like ?`,
      bindings: [term]
    }
  }
}

const getFilterContains = (column, value) => ({
  query: `${column} @> ?`,
  bindings: [value]
})

const getFilterIn = (column, alias, value) => {
  column = alias.key ? `${column}->'${alias.key}'->>0` : `${column}::varchar`
  const bindings = _.without(value, 'null')
  const markers = Array(bindings.length).fill(0).map(i => '?').join(',')
  return {
    query: _.includes(value, 'null') ? `${column} is null or ${column} in (${markers})` : `${column} in (${markers})`,
    bindings: _.without(value, 'null')
  }
}

const getFilterNotIn = (column, alias, value) => {
  const bindings = _.without(value, 'null')
  const markers = Array(bindings.length).fill(0).map(i => '?').join(',')
  const query = []
  if(alias.key) {
    query.push(`not(${column} \\? '${alias.key}')`)
    query.push(`${column}->'${alias.key}'->>0 not in (${markers})`)
    const nullvalue = _.includes(value, 'null') ? 'not null' : 'null'
    query.push(`${column}->'${alias.key}'->>0 is ${nullvalue}`)
  } else {
    query.push(`${column} not in (${markers})`)
    if(_.includes(value, 'null')) query.push(`${column} is not null`)
  }
  return {
    query: query.join(' or '),
    bindings
  }
}

const getFilterLessThan = (column, alias, value) => {
  column = alias.key ? `${column}->'${alias.key}'->>0` : column
  return {
    query: `? != '' and ${column} < ?`,
    bindings: [value, value]
  }
}

const getFilterLessThanEqualTo = (column, alias, value) => {
  column = alias.key ? `${column}->'${alias.key}'->>0` : column
  return {
    query: `? != '' and ${column} <= ?`,
    bindings: [value]
  }
}

const getFilterGreaterThan = (column, alias, value) => {
  column = alias.key ? `${column}->'${alias.key}'->>0` : column
  return {
    query: `? != '' and ${column} > ?`,
    bindings: [value, value]
  }
}

const getFilterGreaterThanEqualTo = (column, alias, value) => {
  column = alias.key ? `${column}->'${alias.key}'->>0` : column
  return {
    query: `? != '' and ${column} >= ?`,
    bindings: [value, value]
  }
}

const getFilterDateRange = (column, alias, value, not) => {
  if(value === 'last_week') return getFilterRange(column, alias, -1, 'week', not)
  if(value === 'last_month') return getFilterRange(column, alias, -1, 'month', not)
  if(value === 'last_quarter') return getFilterRange(column, alias, -1, 'quarter', not)
  if(value === 'last_year') return getFilterRange(column, alias, -1, 'year', not)
  if(value === 'this_week') return getFilterRange(column, alias, 0, 'week', not)
  if(value === 'this_month') return getFilterRange(column, alias, 0, 'month', not)
  if(value === 'this_quarter') return getFilterRange(column, alias, 0, 'quarter', not)
  if(value === 'this_year') return getFilterRange(column, alias, 0, 'year', not)
  if(value === 'next_week') return getFilterRange(column, alias, 1, 'week', not)
  if(value === 'next_month') return getFilterRange(column, alias, 1, 'month', not)
  if(value === 'next_quarter') return getFilterRange(column, alias, 1, 'quarter', not)
  if(value === 'next_year') return getFilterRange(column, alias, 1, 'year', not)
  if(value === 'last_30') return getFilterDuration(column, alias, -30, 'days', not)
  if(value === 'last_60') return getFilterDuration(column, alias, -60, 'days', not)
  if(value === 'last_90') return getFilterDuration(column, alias, -90, 'days', not)
  if(value === 'next_30') return getFilterDuration(column, alias, 30, 'days', not)
  if(value === 'next_60') return getFilterDuration(column, alias, 60, 'days', not)
  if(value === 'next_90') return getFilterDuration(column, alias, 90, 'days', not)
  if(value === 'ytd') return getFilterBetween(column, alias, moment().startOf('year'), moment(), not)
  if(value === 'ltd') return getFilterBetween(column, alias, moment('2000-01-01'), moment(), not)
}

const getFilterRange = (column, alias, quantity, unit, not) => {
  const start = moment().add(quantity, unit).startOf(unit)
  const end = moment().add(quantity, unit).endOf(unit)
  return getFilterBetween(column, alias, start, end, not)
}

const getFilterDuration = (column, alias, quantity, unit, not) => {
  const start = quantity > 0 ? moment().startOf(unit) : moment().add(quantity, unit).endOf(unit)
  const end = quantity > 0 ? moment().add(quantity, unit).endOf(unit) : moment().startOf(unit)
  return getFilterBetween(column, alias, start, end, not)
}

const getFilterBetween = (column, alias, start, end, not) => {
  column = alias.key ? `${column}->'${alias.key}'->>0` : column
  const query = `${column} >= ? and ${column} <= ?`
  return {
    query: not ? `not(${query})` : query,
    bindings: [
      start.format('YYYY-MM-DD'),
      end.format('YYYY-MM-DD')
    ]
  }
}
