import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Trip from '../../../models/trip'

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

  await req.trx('maha_audits')
    .where('auditable_type', 'maha_expenses')
    .where('auditable_id', req.params.id)
    .delete()

  await req.trx('maha_comments')
    .where('commentable_type', 'maha_expenses')
    .where('commentable_id', req.params.id)
    .delete()

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

  await trip.destroy({
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default destroyRoute
