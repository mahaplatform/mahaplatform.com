import Item from '../../../models/item'
import { geocode, knex, Field, Resources, expandValues } from 'maha'
import { applyFilters } from './filters'
import _ from 'lodash'

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

  req.addresses = await Promise.reduce(req.query.$filters.$and, async (addresses, filter) => {
    const key = Object.keys(filter)[0]
    if(!filter[key].$ds) return addresses
    const address = await geocode({
      address: filter[key].$ds
    })
    return [
      ...addresses,
      address
    ]
  }, [])

  return req

}

const defaultQuery = (req, trx, qb, options) => {

  qb.where('site_id', req.params.site_id)

  qb.where('type_id', req.params.type_id)

  qb.where('is_published', true)

  req.query.$sort = null

  req.query.$filters.$and.map(filter => {
    const name = Object.keys(filter)[0]
    if(!filter[name].$ds) return
    const column = _.find(req.fields, { name }).code
    const lon1 = req.addresses[0].longitude
    const lat1 = req.addresses[0].latitude
    const lon2 = `cast(values->'${column}'->0->>'longitude' as float)`
    const lat2 = `cast(values->'${column}'->0->>'latitude' as float)`
    const distance = `(acos(sin(radians(${lat2})) * sin(radians(${lat1})) + cos(radians(${lat2})) * cos(radians(${lat1})) * cos(radians(${lon2} - ${lon1}))) * 6371 * 1000) / 1609.344`
    qb.select(knex.raw(`sites_items.*,${distance} as distance`))
    qb.orderBy('distance','desc')
  })

  if(req.query.$filters) applyFilters(qb, req.fields, req.query.$filters)

}

const serializer = async (req, trx, result) => {

  const values = await expandValues('sites_types', req.params.type_id, result.get('values'), trx)

  return {
    id: result.get('id'),
    distance: result.get('distance'),
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
