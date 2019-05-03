import { Route } from '../../../../../core/backframe'
import knex from '../../../../../core/services/knex'
import _ from 'lodash'

const processor = async (req, trx, options) => {

  const fields = await knex('maha_fields').transacting(trx).where('type', 'lookup').whereRaw('config->\'datasource\'->>\'type_id\'=?', `${req.params.type_id}`)

  await Promise.mapSeries(fields, async (field) => {

    const contains = req.body.ids.map(id => `values->'${field.code}' @> ?`).join(' or ')

    const items = await knex('sites_items').transacting(trx).where('type_id', field.parent_id).whereRaw(contains, req.body.ids)

    await Promise.mapSeries(items, async (item) => {

      const values = {
        ...item.values,
        [field.code]: _.without(item.values[field.code], ...req.body.ids)
      }

      await knex('sites_items').transacting(trx).where('id', item.id).update({ values })

    })

  })

  await knex('sites_items').transacting(trx).whereIn('id', req.body.ids).del()

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
]

const createRoute = new Route({
  method: 'patch',
  path: '/delete',
  processor,
  refresh
})

export default createRoute
