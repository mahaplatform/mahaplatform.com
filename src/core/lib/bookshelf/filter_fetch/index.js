import { parseFilter } from './filter'
import { parseSort } from './sort'
import { fetchPage } from './page'

const filterPlugin = function(bookshelf) {

  const filterFetch = async function(options) {

    options.tableName = this.extend().__super__.tableName

    const filter = parseFilter(options)

    console.log(filter)

    const query = (qb) => {
      if(filter) {
        filter.joins.map(join => {
          qb.joinRaw(join)
        })
        qb.whereRaw(filter.query, filter.bindings)
      }
    }

    // const sort = parseSort(options)
    // console.log(sort)

    if(options.page) return await fetchPage.bind(this.query(query))(bookshelf, options)

    return await this.query(query).fetchAll({
      withRelated: options.withRelated,
      transacting: options.transacting
    })

  }

  bookshelf.Collection.prototype.filterFetch = filterFetch

  bookshelf.Model.prototype.filterFetch = filterFetch

  bookshelf.Model.filterFetch = filterFetch

}

export default filterPlugin
