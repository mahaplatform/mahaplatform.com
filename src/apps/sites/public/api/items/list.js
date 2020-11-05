import { expandValues } from '@apps/maha/services/values'
import geocode from '@apps/maha/services/geocode'
import knex from '@core/services/knex'
import Field from '@apps/maha/models/field'
import { applyFilters } from './filters'
import Item from '../../../models/item'
import _ from 'lodash'

const listRoute = async (req, res) => {

  const fields = await Field.where({
    parent_type: 'sites_types',
    parent_id: req.params.type_id
  }).fetchAll({
    transacting: req.trx
  }).then(fields => fields.toArray().map(field => ({
    name: field.get('name').token,
    code: field.get('code')
  })))

  req.fields = [
    ...fields,
    { name: 'id', code: 'id' }
  ]

  if(req.query.$filters) {
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
  }

  const items = await Item.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('site_id', req.params.site_id)
      qb.where('type_id', req.params.type_id)
      qb.where('is_published', true)
      if(req.query.$filters) {
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
          qb.orderBy('distance','asc')
        })
        applyFilters(qb, req.fields, req.query.$filters)
      }
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(items, async (req, result) => ({
    id: result.get('id'),
    distance: result.get('distance'),
    ...await expandValues(req, {
      parent_type: 'sites_types',
      parent_id: req.params.type_id,
      data: result.get('values'),
      withNames: true
    })
  }))

}

export default listRoute
