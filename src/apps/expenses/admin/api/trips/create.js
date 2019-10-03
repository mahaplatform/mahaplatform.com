import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import TripSerializer from '../../../serializers/trip_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { completeItem } from '../../../services/items'
import Trip from '../../../models/trip'
import Rate from '../../../models/rate'
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

const createRoute = async (req, res) => {

  const mileage_rate = await _getMileageRate(req, req.body.date)

  const amount = mileage_rate ? req.body.total_miles * mileage_rate : null

  const trip = await Trip.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    expense_type_id: req.apps.expenses.settings.trip_expense_type_id,
    mileage_rate,
    amount,
    ...whitelist(req.body, ['project_id','date','description','time_leaving','time_arriving','odometer_start','odometer_end','total_miles'])
  }).save(null, {
    transacting: req.trx
  })

  await completeItem(req, {
    item: trip,
    required: ['date','description','project_id','odometer_start','odometer_end','total_miles']
  })

  await activity(req, {
    story: 'created {object}',
    object: trip
  })

  await audit(req, {
    story: 'created',
    auditable: trip
  })

  await socket.refresh(req, [
    `/admin/expenses/trips/${trip.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(trip, TripSerializer)

}

export default createRoute
