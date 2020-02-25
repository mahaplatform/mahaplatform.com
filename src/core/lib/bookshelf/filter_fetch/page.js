const DEFAULT_LIMIT = 100

const DEFAULT_SKIP = 0

export const fetchPage = async function(bookshelf, options) {

  const { page } = options

  if(!options.scope) options.scope = qb => {}

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
