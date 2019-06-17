import _ from 'lodash'

const sortPlugin = function(bookshelf) {

  const sort = function(options) {
    options.tableName = this.tableName
    return this.query(qb => {
      applySorts(qb, options.sort, options)
    })
  }

  const applySorts = (qb, $sorts, options) => {
    const sorts = normalizeSort($sorts, options)
    if(sorts.length === 0) return
    sorts.map(sort => {
      const { column, order } = applySort(sort, options)
      qb.orderByRaw(`${column} ${order}`)
    })
  }

  const normalizeSort = ($sorts, options) => {
    const sorts = $sorts || options.defaultSort || 'id'
    return _.castArray(sorts).map(sort => {
      if(!_.isString(sort)) return sort
      return {
        column: sort.replace(/^-/, ''),
        order: sort[0] === '-' ? 'desc' : 'asc'
      }
    }).filter(sort => !_.isNil(sort.column))
  }

  const applySort = (sort, options) => {
    if(options.sortParams && !_.includes(options.sortParams, sort.column)) {
      throw new Error(`cannot sort on ${sort.column}`)
    }
    return {
      column: castColumn(options.tableName, sort.column),
      order: sort.order || 'asc'
    }
  }

  const castColumn = function(tableName, column) {
    const matches = column.match(/(.*)\.(.*)/)
    return matches ? column : `${tableName}.${column}`
  }

  bookshelf.Collection.prototype.sort = sort

  bookshelf.Model.prototype.sort = sort

  bookshelf.Model.sort = sort

}

export default sortPlugin
