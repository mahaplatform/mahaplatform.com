import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import Reimbursement from '../../../models/reimbursement'
import knex from '../../../../../core/services/knex'

const destroyRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  await knex('expenses_receipts').transacting(req.trx).where('reimbursement_id', req.params.id).delete()

  await knex('maha_audits').transacting(req.trx).where('auditable_type', 'maha_expenses').where('auditable_id', req.params.id).delete()

  await knex('maha_comments').transacting(req.trx).where('commentable_type', 'maha_expenses').where('commentable_id', req.params.id).delete()

  await activity(req, {
    story: 'deleted {object}',
    object: reimbursement
  })

  await socket.refresh(req, [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/reimbursements/${reimbursement.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  await reimbursement.destroy({
    transacting: req.trx
  })

  res.status(200).respond(true)

}

export default destroyRoute
