const DEFAULT_LIMIT = 100

const DEFAULT_SKIP = 0

const fetchPagePlugin = function(bookshelf) {

  const fetchPage = async function(options) {

    const { page } = options

    const trx = options.transacting

    const limit = page && page.limit ? parseInt(page.limit) : DEFAULT_LIMIT

    const skip = page && page.skip ? parseInt(page.skip) : DEFAULT_SKIP

    const team_id = await new Promise((resolve, reject) => {
      this.clone().query(qb => {
        const team = qb._statements.find(statement => {
          return statement.grouping === 'where' && statement.type === 'whereBasic' && statement.column.match(/team_id/)
        })
        resolve(team ? team.value : null)
      })
    })

    const all = await this.clone().resetQuery().query(qb => {
      if(team_id) qb.where('team_id', team_id)
    }).count({
      transacting: trx
    }).then(result => parseInt(result))

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

  bookshelf.Collection.prototype.fetchPage = fetchPage

  bookshelf.Model.prototype.fetchPage = fetchPage

}

export default fetchPagePlugin
