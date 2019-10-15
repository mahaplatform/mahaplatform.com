import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Advance from '../../../models/advance'

const destroyRoute = async (req, res) => {

  const advance = await Advance.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!advance) return res.status(404).respond({
    code: 404,
    message: 'Unable to load advance'
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
    object: advance
  })

  await socket.refresh(req, [
    `/admin/expenses/advances/${advance.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  await advance.destroy({
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default destroyRoute
