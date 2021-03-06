import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import TripSerializer from '@apps/finance/serializers/trip_serializer'
import socket from '@core/services/routes/emitter'
import { completeItem } from '@apps/finance/services/items'
import Trip from '@apps/finance/models/trip'
import Rate from '@apps/finance/models/rate'
import moment from 'moment'

const _getMileageRate = async (req, date) => {
  const year = parseInt(moment(date).format('YYYY'))
  const rate = await Rate.query(qb => {
    qb.where('year', year)
  }).fetch({
    transacting: req.trx
  })
  return rate ? rate.get('value') : null
}

const updateRoute = async (req, res) => {

  const trip = await Trip.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type'],
    transacting: req.trx
  })

  if(!trip) return res.status(404).respond({
    code: 404,
    message: 'Unable to load trip'
  })

  const mileage_rate = await _getMileageRate(req, req.body.date)

  const amount = mileage_rate ? req.body.total_miles * mileage_rate : null

  await trip.save({
    mileage_rate,
    amount,
    ...whitelist(req.body, ['project_id','date','description','time_leaving','time_arriving','odometer_start','odometer_end','total_miles']),
    status: trip.get('status') === 'rejected' ? 'pending' : trip.get('status')
  }, {
    transacting: req.trx
  })

  await completeItem(req, {
    item: trip,
    required: ['date','description','project_id','odometer_start','odometer_end','total_miles']
  })

  await activity(req, {
    story: 'updated {object}',
    object: trip
  })

  await audit(req, {
    story: 'updated',
    auditable: trip
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

  await res.status(200).respond(trip, TripSerializer)

}

export default updateRoute
