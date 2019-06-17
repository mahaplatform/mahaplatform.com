import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Check from '../../../models/check'

const destroyRoute = async (req, res) => {

  const check = await Check.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  await knex('expenses_receipts').transacting(req.trx).where('expense_id', req.params.id).delete()

  await knex('maha_audits').transacting(req.trx).where('auditable_type', 'maha_expenses').where('auditable_id', req.params.id).delete()

  await knex('maha_comments').transacting(req.trx).where('commentable_type', 'maha_expenses').where('commentable_id', req.params.id).delete()

  await knex('maha_listenings').transacting(req.trx).where('listenable_type', 'maha_expenses').where('listenable_id', req.params.id).delete()

  await activity(req, {
    story: 'deleted {object}',
    object: check
  })

  await socket.refresh(req, [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/checks/${check.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  await check.destroy({
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default destroyRoute
