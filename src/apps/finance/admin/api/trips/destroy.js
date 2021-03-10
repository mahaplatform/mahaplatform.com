import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import Trip from '@apps/finance/models/trip'
import moment from 'moment'

const destroyRoute = async (req, res) => {

  const trip = await Trip.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!trip) return res.status(404).respond({
    code: 404,
    message: 'Unable to load trip'
  })

  await trip.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'deleted {object}',
    object: trip
  })

  await socket.refresh(req, [
    `/admin/finance/trips/${trip.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
