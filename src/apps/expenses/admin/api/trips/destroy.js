import { activity } from '../../../../../web/core/services/routes/activities'
import socket from '../../../../../web/core/services/routes/emitter'
import Trip from '../../../models/trip'

const destroyRoute = async (req, res) => {

  const trip = await Trip.scope({
    team: req.team
  }).query(qb => {
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
    `/admin/expenses/trips/${trip.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  await trip.destroy({
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default destroyRoute
