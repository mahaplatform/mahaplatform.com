import moment from 'moment'
import _ from 'lodash'

const DEFAULT_LIMIT = 100

const DEFAULT_SKIP = 0

const filterPlugin = function(bookshelf) {

  const filterFetch = async function(options) {

    options.tableName = this.extend().__super__.tableName

    const filter = options.filter || {}

    const sort = options.sort || {}

    const query = (qb) => {
      if(options.scope) options.scope(qb)
      if(filter.params) applyFilters(qb, options)
      if(sort.params) applySorts(qb, options)
    }

    if(options.page) return await fetchPage.bind(this.query(query))(options)

    return await this.query(query).fetchAll({
      withRelated: options.withRelated,
      transacting: options.transacting
    })

  }

  const fetchPage = async function(options) {

    const { page } = options

    const trx = options.transacting

    const limit = page && page.limit ? parseInt(page.limit) : DEFAULT_LIMIT

    const skip = page && page.skip ? parseInt(page.skip) : DEFAULT_SKIP

    const allsql = await new Promise((resolve, reject) => {
      this.clone().resetQuery().query(options.scope).query(qb => {
        resolve(`select count(*) from (${qb.toString()}) total`)
      })
    })

    const all = await bookshelf.knex.raw(allsql).transacting(trx).then(result => {
      return parseInt(result.rows[0].count)
    })

    const totalsql = await new Promise((resolve, reject) => {
      this.clone().query(qb => {
        resolve(`select count(*) from (${qb.toString()}) total`)
      })
    })

    const total = await bookshelf.knex.raw(totalsql).transacting(trx).then(result => {
      return parseInt(result.rows[0].count)
    })

    const result = await this.query(qb => {
      if(limit === 0) return
      qb.limit(limit)
      qb.offset(skip)
    }).fetchAll({
      withRelated: options.withRelated,
      transacting: trx
    })

    result.pagination = {
      all,
      total,
      limit,
      skip
    }

    return result

  }

  const applyFilters = (qb, options) => {
    const filters = normalizeFilters(options.filter.params)
    if(filters.$and) return applyAnd(qb, filters.$and, options)
    if(filters.$or) return applyOr(qb, filters.$or, options)
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

  const andFilters = (filters) => {
    if(_.isPlainObject(filters) && !filters.$and && !filters.$or) return {
      $and: Object.keys(filters).map(key => ({
        [key]: filters[key]
      }))
    }
    if(_.isArray(filters)) return { $and: filters }
    return filters
  }

  const applyAnd = (qb, filters, options) => {
    if(!filters.map) return
    filters.map(filter => {
      qb.andWhere(function(builder) {
        applyFilter(builder, Object.keys(filter)[0], Object.values(filter)[0], options)
      })
    })
  }

  const applyOr = (qb, filters, options) => {
    if(!filters.map) return
    qb.andWhere(function(builder) {
      filters.map(filter => {
        builder.orWhere(function(builder2) {
          applyFilter(builder2, Object.keys(filter)[0], Object.values(filter)[0], options)
        })
      })
    })
  }

  const applyFilter = (qb, name, filter, options) => {
    if(name === '$and') return applyAnd(qb, filter, options)
    if(name === '$or') return applyOr(qb, filter, options)
    if(options.filter.allowed && !_.includes(['id','q',...options.filter.allowed], name)) {
      throw new Error(`cannot filter on ${name}`)
    }
    if(options.filter.virtuals && options.filter.virtuals[name]) {
      return options.filter.virtuals[name](qb, filter)
    }
    _filterColumn(qb, name, filter, options)
  }

  const _filterColumn = (qb, $column, filter, options) => {
    const column = castColumn($column, options)
    if($column === 'q') {
      _filterSearch(qb, filter, options)
    } else if(!_.isNil(filter.$nl)) {
      _filterNull(qb, column)
    } else if(!_.isNil(filter.$nnl)) {
      _filterNotNull(qb, column)
    } else if(!_.isNil(filter.$kn)) {
      _filterKnown(qb, column)
    } else if(!_.isNil(filter.$nkn)) {
      _filterNotKnown(qb, column)
    } else if(!_.isNil(filter.$eq)) {
      _filterEqual(qb, column, filter.$eq)
    } else if(!_.isNil(filter.$neq)) {
      _filterNotEqual(qb, column, filter.$neq)
    } else if(!_.isNil(filter.$lk)) {
      _filterLike(qb, column, filter.$lk)
    } else if(!_.isNil(filter.$nlk)) {
      _filterNotLike(qb, column, filter.$nlk)
    } else if(!_.isNil(filter.$ct)) {
      _filterContains(qb, column, filter.$ct)
    } else if(!_.isNil(filter.$in)) {
      _filterIn(qb, column, filter.$in)
    } else if(!_.isNil(filter.$nin)) {
      _filterNotIn(qb, column, filter.$nin)
    } else if(!_.isNil(filter.$lt)) {
      _filterLessThan(qb, column, filter.$lt)
    } else if(!_.isNil(filter.$lte)) {
      _filterLessThanEqualTo(qb, column, filter.$lte)
    } else if(!_.isNil(filter.$gt)) {
      _filterGreaterThan(qb, column, filter.$gt)
    } else if(!_.isNil(filter.$gte)) {
      _filterGreaterThanEqualTo(qb, column, filter.$gte)
    } else if(!_.isNil(filter.$dr)) {
      _filterDateRange(qb, column, filter.$dr)
    }
  }

  const _filterSearch = (qb, filter, options) => {
    if(!options.filter.search) return
    if(filter.length === 0) return
    const columns = options.filter.search.map(column => castColumn(column, options))
    const phrase = `lower(concat(${columns.join(',\' \',')}))`
    const term = `%${filter.toLowerCase()}%`
    qb.whereRaw(`${phrase} like ?`, term)
  }

  const _filterNull = (qb, column) => {
    qb.whereNull(column)
  }

  const _filterNotNull = (qb, column) => {
    qb.whereNotNull(column)
  }

  const _filterKnown = (qb, column) => {
    qb.whereRaw(`${column} is not null or ${column} != ?`, '')
  }

  const _filterNotKnown = (qb, column) => {
    qb.whereRaw(`${column} is null or ${column} = ?`, '')
  }

  const _filterEqual = (qb, column, value) => {
    if(value === 'null') return qb.whereRaw(`${column} is null`)
    if(value === 'not_null') return qb.whereRaw(`${column} is not null`)
    if(value === 'true') return qb.whereRaw(`${column} = ?`, true)
    if(value === 'false') return qb.whereRaw(`${column} = ?`, false)
    if(`${value}`.match(/^\d*$/)) return qb.whereRaw(`${column} = ?`, value)
    return qb.whereRaw(`lower(${column}::varchar) = ?`, value.toLowerCase())
  }

  const _filterNotEqual = (qb, column, value) => {
    qb.whereRaw(`not ${column} = ?`, value)
  }

  const _filterLike = (qb, column, value) => {
    qb.whereRaw(`lower(${column}) like ?`, `%${value.toLowerCase()}%`)
  }

  const _filterNotLike = (qb, column, value) => {
    qb.whereRaw(`lower(${column}) not like ?`, `%${value.toLowerCase()}%`)
  }

  const _filterContains = (qb, column, value) => {
    qb.whereRaw(`${column} @> ?`, value)
  }

  const _filterIn = (qb, column, value) => {
    const inArray = _.without(value, 'null')
    if(!_.includes(value, 'null')) return qb.whereIn(column, inArray)
    qb.where(function() {
      this.whereIn(column, inArray).orWhereNull(column)
    })
  }

  const _filterNotIn = (qb, column, value) => {
    const inArray = _.without(value, 'null')
    if(!_.includes(value, 'null')) return qb.whereNotIn(column, inArray)
    qb.where(function() {
      this.whereNotIn(column, inArray).orWhereNotNull(column)
    })
  }

  const _filterLessThan = (qb, column, value) => {
    qb.whereRaw(`${column} < ?`, value)
  }

  const _filterLessThanEqualTo = (qb, column, value) => {
    qb.whereRaw(`${column} <= ?`, value)
  }

  const _filterGreaterThan = (qb, column, value) => {
    qb.whereRaw(`${column} > ?`, value)
  }

  const _filterGreaterThanEqualTo = (qb, column, value) => {
    qb.whereRaw(`${column} >= ?`, value)
  }

  const _filterDateRange = (qb, column, value) => {
    if(value === 'this_week') {
      _filterRange(qb, column, 0, 'week')
    } else if(value === 'last_week') {
      _filterRange(qb, column, -1, 'week')
    } else if(value === 'next_week') {
      _filterRange(qb, column, 1, 'week')
    } else if(value=== 'this_month') {
      _filterRange(qb, column, 0, 'month')
    } else if(value === 'last_month') {
      _filterRange(qb, column, -1, 'month')
    } else if(value === 'next_month') {
      _filterRange(qb, column, 1, 'month')
    } else if(value === 'this_quarter') {
      _filterRange(qb, column, 0, 'quarter')
    } else if(value === 'last_quarter') {
      _filterRange(qb, column, -1, 'quarter')
    } else if(value === 'next_quarter') {
      _filterRange(qb, column, 1, 'quarter')
    } else if(value === 'this_year') {
      _filterRange(qb, column, 0, 'year')
    } else if(value === 'last_year') {
      _filterRange(qb, column, -1, 'year')
    } else if(value === 'next_year') {
      _filterRange(qb, column, 1, 'year')
    } else if(value=== 'last_30') {
      _filterDuration(qb, column, -30, 'day')
    } else if(value === 'next_30') {
      _filterDuration(qb, column, 30, 'day')
    } else if(value === 'last_60') {
      _filterDuration(qb, column, -60, 'day')
    } else if(value === 'next_60') {
      _filterDuration(qb, column, 60, 'day')
    } else if(value === 'last_90') {
      _filterDuration(qb, column, -90, 'day')
    } else if(value=== 'next_90') {
      _filterDuration(qb, column, 90, 'day')
    } else if(value === 'ytd') {
      _filterBetween(qb, column, moment().startOf('year'), moment())
    } else if(value === 'ltd') {
      _filterBetween(qb, column, moment('2000-01-01'), moment())
    }
  }

  const _filterRange = (qb, column, quantity, unit) => {
    _filterBetween(qb, column, moment().add(quantity, unit).startOf(unit), moment().add(quantity, unit).endOf(unit))
  }

  const _filterDuration = (qb, column, quantity, unit) => {
    if(quantity > 0) {
      _filterBetween(qb, column, moment().startOf(unit), moment().add(quantity, unit).endOf(unit))
    } else {
      _filterBetween(qb, column, moment().add(quantity, unit).endOf(unit), moment().startOf(unit))
    }
  }

  const _filterBetween = (qb, column, start, end) => {
    qb.whereRaw(`${column} >= ?`, start.format('YYYY-MM-DD'))
    qb.whereRaw(`${column} <= ?`, end.format('YYYY-MM-DD'))
  }

  const applySorts = (qb, options) => {
    const sorts = normalizeSort(options.sort.params, options)
    if(sorts.length === 0) return
    sorts.map(sort => {
      const { column, order } = applySort(sort, options)
      qb.orderByRaw(`${column} ${order}`)
    })
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

  const applySort = (sort, options) => {
    if(options.sort.allowed && !_.includes(options.sort.allowed, sort.column)) {
      throw new Error(`cannot sort on ${sort.column}`)
    }
    return {
      column: castColumn(sort.column, options),
      order: sort.order || 'asc'
    }
  }

  const castColumn = function($column, options) {
    const column = getAliased($column, options)
    const { tableName } = options
    console.log($column, $column, tableName)
    const matches = column.match(/(.*)\.(.*)/)
    return !matches && tableName !== undefined ? `${tableName}.${column}` : column
  }

  const getAliased = (column, options)  => {
    if(!options.aliases) return column
    return options.aliases[column] || column
  }

  bookshelf.Collection.prototype.filterFetch = filterFetch

  bookshelf.Model.prototype.filterFetch = filterFetch

  bookshelf.Model.filterFetch = filterFetch

}

export default filterPlugin
