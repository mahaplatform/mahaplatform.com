import ItemSerializer from '../../../serializers/item_serializer'
import { addIndex } from '../../../services/search'
import { Route, Field, processValues } from 'maha'

const processor = async (req, trx, options) => {

  const values = await processValues('sites_types', req.params.type_id, req.body.values, trx)

  await req.resource.save({ values }, {
    patch: true,
    transacting: trx
  })

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

  await addIndex(req.resource, map, trx)

  return req.resource

}

const refresh = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items`,
  `/admin/sites/sites/${req.params.site_id}/types/${req.params.type_id}/items/${result.get('id')}`
]

const createRoute = new Route({
  method: 'patch',
  path: '',
  processor,
  refresh,
  serializer: ItemSerializer
})

export default createRoute
