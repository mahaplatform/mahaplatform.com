const DEFAULT_LIMIT = 100

const DEFAULT_SKIP = 0

const paginationPlugin = function(bookshelf) {

  const fetchPage = async function(options) {

    const { page } = options

    const limit = page && page.limit ? parseInt(page.limit) : DEFAULT_LIMIT

    const skip = page && page.skip ? parseInt(page.skip) : DEFAULT_SKIP

    const all = await this.clone().resetQuery().count({
      transacting: options.transacting
    }).then(result => parseInt(result))

    const total = await this.clone().fetchAll({
      transacting: options.transacting
    })

    const result = await this.query(qb => {
      if(limit === 0) return
      qb.limit(limit)
      qb.offset(skip)
    }).fetchAll({
      withRelated: options.withRelated,
      transacting: options.transacting
    })

    result.pagination = {
      all,
      total: total.length,
      limit,
      skip
    }

    return result

  }

  bookshelf.Model.prototype.fetchPage = fetchPage

  bookshelf.Collection.prototype.fetchPage = fetchPage

}

export default paginationPlugin
