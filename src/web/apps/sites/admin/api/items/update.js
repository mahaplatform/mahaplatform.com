import ItemSerializer from '../../../serializers/item_serializer'
import { processValues } from '../../../../maha/services/values'
import { addIndex } from '../../../services/search'
import Field from '../../../../maha/models/field'
import Item from '../../../models/item'

const updateRoute = async (req, res) => {

  const item = await Item.scope({
    team: req.team
  }).query(qb => {
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

  const values = await processValues(req, 'sites_types', req.params.type_id, req.body.values)

  await item.save({ values }, {
    patch: true,
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

  res.status(200).respond(item, ItemSerializer)

}

export default updateRoute
