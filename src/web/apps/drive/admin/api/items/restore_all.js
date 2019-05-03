import { Route } from '../../../../../core/backframe'
import knex from '../../../../../core/services/knex'

const processor = async (req, trx, options) => {

  await knex.transacting(trx).whereNotNull('deleted_at').update({
    deleted_at: null
  })

}

const restoreAllRoute = new Route({
  method: 'post',
  path: '/restore_all',
  processor
})

export default restoreAllRoute
