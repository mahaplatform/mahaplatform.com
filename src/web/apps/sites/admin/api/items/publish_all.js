import { Route } from '../../../../../core/backframe'
import knex from '../../../../../core/services/knex'

const processor = async (req, trx, options) => {

  await knex('sites_items').transacting(trx).whereIn('id', req.body.ids).update({
    is_published: req.body.is_published
  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
]

const createRoute = new Route({
  method: 'patch',
  path: '/publish',
  processor,
  refresh
})

export default createRoute
