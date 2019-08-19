import socket from '../../../../../core/services/routes/emitter'
import _ from 'lodash'

const deleteAllRoute = async (req, res) => {

  const fields = await req.trx('maha_fields')
    .where('type', 'lookup')
    .whereRaw('config->\'datasource\'->>\'type_id\'=?', req.params.type_id)

  await Promise.mapSeries(fields, async (field) => {

    const contains = req.body.ids.map(id => `values->'${field.code}' @> ?`).join(' or ')

    const items = await req.trx('sites_items')
      .where('type_id', field.parent_id)
      .whereRaw(contains, req.body.ids)

    await Promise.mapSeries(items, async (item) => {
      await req.trx('sites_items').where('id', item.id).update({
        values: {
          ...item.values,
          [field.code]: _.without(item.values[field.code], ...req.body.ids)
        }
      })
    })

  })

  await req.trx('sites_items').whereIn('id', req.body.ids).del()

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`
  ])

  res.status(200).respond(true)

}

export default deleteAllRoute
