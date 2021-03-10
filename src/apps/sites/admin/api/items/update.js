import ItemSerializer from '@apps/sites/serializers/item_serializer'
import socket from '@core/services/routes/emitter'
import { processValues } from '@apps/maha/services/values'
import { addIndex } from '@apps/sites/services/search'
import Field from '@apps/maha/models/field'
import Item from '@apps/sites/models/item'

const updateRoute = async (req, res) => {

  const item = await Item.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('site_id', req.params.site_id)
    qb.where('type_id', req.params.type_id)
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!item) return res.status(404).respond({
    code: 404,
    message: 'Unable to load item'
  })

  const values = await processValues(req, {
    parent_type: 'sites_types',
    parent_id: req.params.type_id,
    values: req.body.values
  })

  await item.save({ values }, {
    patch: true,
    transacting: req.trx
  })

  req.fields = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'sites_types')
    qb.where('parent_id', req.params.type_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const map = await Field.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('parent_type', 'sites_types')
    qb.orderBy(['parent_id','delta'])
  }).fetchAll({
    transacting: req.trx
  }).then(fields => fields.reduce((map, field) => ({
    ...map,
    [field.get('parent_id')]: [
      ...map[field.get('parent_id')] || [],
      field
    ]
  }), {}))

  await addIndex(req, {
    item,
    map
  })

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`,
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items/${item.get('id')}`
  ])

  await res.status(200).respond(item, ItemSerializer)

}

export default updateRoute
