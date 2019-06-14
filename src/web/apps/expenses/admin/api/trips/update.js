import { activity } from '../../../../../core/services/routes/activities'
import { listeners } from '../../../../../core/services/routes/listeners'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import TripSerializer from '../../../serializers/trip_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { completeItem } from '../../../services/items'
import Member from '../../../models/member'
import Trip from '../../../models/trip'

const updateRoute = async (req, res) => {

  const trip = await Trip.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type','status'],
    transacting: req.trx
  })

  if(!trip) return req.status(404).respond({
    code: 404,
    message: 'Unable to load trip'
  })

  await trip.save(whitelist(req.body, ['expense_type_id','project_id','date','description','time_leaving','time_arriving','odometer_start','odometer_end','total_miles','amount','mileage_rate']), {
    transacting: req.trx
  })

  await completeItem(req, {
    item: trip,
    required: ['date','description','project_id','odometer_start','odometer_end','total_miles']
  })

  const members = await Member.query(qb => {
    qb.where('project_id', trip.get('project_id'))
    qb.whereRaw('(member_type_id != ? OR user_id = ?)', [3, req.user.get('id')])
  }).fetchAll({
    transacting: req.trx
  })

  await listeners(req, members.map(member => ({
    listenable: trip,
    user_id: member.get('user_id')
  })))

  await activity(req, {
    story: 'updated {object}',
    object: trip
  })

  await audit(req, {
    story: 'updated',
    auditable: trip
  })

  await socket.refresh(req, [{
    channel: 'user',
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

export default updateRoute
