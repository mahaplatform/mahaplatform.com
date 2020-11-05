import { activity } from '@core/services/routes/activities'
import LocationSerializer from '../../../serializers/location_serializer'
import socket from '@core/services/routes/emitter'
import { whitelist } from '@core/services/routes/params'
import Location from '../../../models/location'

const createRoute = async (req, res) => {

  const location = await Location.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['name','address'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: location
  })

  await socket.refresh(req, [
    '/admin/events/locations'
  ])

  res.status(200).respond(location, LocationSerializer)

}

export default createRoute
