import _ from 'lodash'

const sortPlugin = function(bookshelf) {

  const sort = function(options) {
    return this.query(qb => {
      if(options.sort) applySort(qb, options.sort)
    })
  }

  const applySort = (qb, sort) => {
    const order = _.castArray(sort).map(item => {
      return _.isString(item) ? { column: item, order: 'asc' } : item
    }).filter(item => !_.isNil(item.column))
    if(order.length === 0) return
    qb.orderBy(order.map(item => ({
      column: item.column,
      order: item.order || 'asc'
    })))
  }

  bookshelf.Collection.prototype.sort = sort

  bookshelf.Model.prototype.sort = sort

}

export default sortPlugin
