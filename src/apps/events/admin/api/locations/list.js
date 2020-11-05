import LocationSerializer from '@apps/events/serializers/location_serializer'
import Location from '@apps/events/models/location'

const listRoute = async (req, res) => {

  const locations = await Location.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['name'],
      search: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name',
      allowed: ['name']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(locations, LocationSerializer)

}

export default listRoute
