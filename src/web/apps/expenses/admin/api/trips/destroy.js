import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
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

  await knex('maha_audits').transacting(req.trx).where('auditable_type', 'maha_expenses').where('auditable_id', req.params.id).delete()

  await knex('maha_comments').transacting(req.trx).where('commentable_type', 'maha_expenses').where('commentable_id', req.params.id).delete()

  await knex('maha_listenings').transacting(req.trx).where('listenable_type', 'maha_expenses').where('listenable_id', req.params.id).delete()

  await activity(req, {
    story: 'deleted {object}',
    object: trip
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

  await trip.destroy({
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default destroyRoute
