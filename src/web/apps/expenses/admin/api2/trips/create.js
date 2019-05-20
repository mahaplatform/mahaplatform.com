import { activity } from '../../../../../core/services/routes/activities'
import { audit } from '../../../../../core/services/routes/audit'
import TripSerializer from '../../../serializers/trip_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Trip from '../../../models/trip'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['expense_type_id','project_id','date','description','time_leaving','time_arriving','odometer_start','odometer_end','total_miles','amount','mileage_rate'])

  const data = _.omitBy(allowed, _.isNil)

  const trip = await Trip.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: trip
  })

  await audit(req, {
    story: 'created',
    auditable: {
      tableName: 'expenses_trips',
      id: trip.get('id')
    }
  })

  await socket.refresh(req, [{
    channel: `/admin/users/${req.user.get('id')}`,
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/trips/${trip.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(trip, (trip) => {
    return TripSerializer(req, req.trx, trip)
  })

}

export default createRoute
