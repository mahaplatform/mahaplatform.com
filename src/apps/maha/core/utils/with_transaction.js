import knex from '../services/knex'

export const withTransaction = (req, res, middleware) => knex.transaction(async trx => {

  try {

    await middleware(trx)

    await trx.commit()

  } catch(err) {

    console.error(err.stack)

    await trx.rollback(err)

    res.status(500).json({})

  }

})
