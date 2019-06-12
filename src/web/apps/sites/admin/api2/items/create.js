import ItemSerializer from '../../../serializers/item_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { processValues } from '../../../../maha/services/values'
import { addIndex } from '../../../services/search'
import Field from '../../../../maha/models/field'
import Item from '../../../models/item'

const createRoute = async (req, res) => {

  const values = await processValues('sites_types', req.params.type_id, req.body.values, req.trx)

  const item = await Item.forge({
    team_id: req.team.get('id'),
    site_id: req.params.site_id,
    type_id: req.params.type_id,
    values
  }).save(null, {
    transacting: req.trx
  })

  req.fields = await Field.query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.where('parent_id', req.params.type_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({
    transacting: req.trx
  }).then(result => result.toArray())

  const map = await Field.query(qb => {
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

  await addIndex(item, map, req.trx)

  await socket.refresh(req, [
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`,
    `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items/${item.get('id')}`
  ])

  res.status(200).respond(item, (item) => {
    return ItemSerializer(req, req.trx, item)
  })

}

export default createRoute
