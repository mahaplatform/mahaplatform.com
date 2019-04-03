import Item from '../../../models/item'
import { Field, Resources, expandValues } from 'maha'
import { applyFilters } from './filters'

const alterRequest = async (req, trx, options) => {

  const fields = await Field.where({
    parent_type: 'sites_types',
    parent_id: req.params.type_id
  }).fetchAll({ transacting: trx }).then(fields => fields.toArray().map(field => ({
    name: field.get('name'),
    code: field.get('code')
  })))

  req.fields = [
    ...fields,
    { name: 'id', code: 'id' }
  ]

  return req

}

const defaultQuery = (req, trx, qb, options) => {

  qb.where('site_id', req.params.site_id)

  qb.where('type_id', req.params.type_id)

  if(req.query.$filter) applyFilters(qb, req.fields, req.query.$filter)

}

const serializer = async (req, trx, result) => {

  const values = await expandValues('sites_types', req.params.type_id, result.get('values'), trx)

  return {
    id: result.get('id'),
    ...values
  }
}

const itemsResources = new Resources({
  alterRequest,
  defaultQuery,
  defaultSort: '-created_at',
  model: Item,
  path: '/sites/:site_id/types/:type_id/items',
  serializer
})

export default itemsResources
