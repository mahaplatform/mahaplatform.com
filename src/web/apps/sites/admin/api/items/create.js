import ItemSerializer from '../../../serializers/item_serializer'
import { Route } from '../../../../../core/backframe'
import Field from '../../../../maha/models/field'
import { processValues } from '../../../../maha/services/values'
import { addIndex } from '../../../services/search'
import Item from '../../../models/item'

const processor = async (req, trx, options) => {

  const values = await processValues('sites_types', req.params.type_id, req.body.values, trx)

  const item = await Item.forge({
    team_id: req.team.get('id'),
    site_id: req.params.site_id,
    type_id: req.params.type_id,
    values
  }).save(null, { transacting: trx})

  req.fields = await Field.query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.where('parent_id', req.params.type_id)
    qb.orderBy('delta', 'asc')
  }).fetchAll({ transacting: trx }).then(result => result.toArray())

  const map = await Field.query(qb => {
    qb.where('parent_type', 'sites_types')
    qb.orderBy(['parent_id','delta'])
  }).fetchAll({
    transacting: trx
  }).then(fields => fields.reduce((map, field) => ({
    ...map,
    [field.get('parent_id')]: [
      ...map[field.get('parent_id')] || [],
      field
    ]
  }), {}))

  await addIndex(item, map, trx)

  return item

}

const refresh = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`,
  `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items/${result.get('id')}`
]

const createRoute = new Route({
  method: 'post',
  path: '',
  processor,
  refresh,
  serializer: ItemSerializer
})

export default createRoute
