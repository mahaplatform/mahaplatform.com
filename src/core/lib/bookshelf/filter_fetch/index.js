import { parseFilter } from './filter'
import { parseSort } from './sort'
import { fetchPage } from './page'
import _ from 'lodash'

const filterPlugin = function(bookshelf) {

  const filterFetch = async function(options) {

    options.tableName = this.extend().__super__.tableName

    const filter = parseFilter(options)
    const sort = parseSort(options)

    const query = (qb) => {
      if(options.scope) options.scope(qb)
      if(filter) {
        filter.joins.map(join => {
          const arr = _.castArray(join)
          qb.joinRaw(arr[0], arr.slice(1))
        })
        if(filter.query) {
          qb.whereRaw(filter.query, filter.bindings)
        }
      }
      if(sort) {
        qb.orderByRaw(sort.join(','))
      }
    }

    if(options.page) return await fetchPage.bind(this.query(query))(bookshelf, options)

    const result = await this.query(query).fetchAll({
      withRelated: options.withRelated,
      transacting: options.transacting
    })

    result.pagination = {
      all: result.length,
      total: result.length,
      limit: result.length,
      skip: 0
    }

    return result

  }

  bookshelf.Collection.prototype.filterFetch = filterFetch

  bookshelf.Model.prototype.filterFetch = filterFetch

  bookshelf.Model.filterFetch = filterFetch

}

export default filterPlugin
