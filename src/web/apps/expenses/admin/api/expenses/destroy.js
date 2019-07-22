import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'
import Expense from '../../../models/expense'

const destroyRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  await knex('expenses_receipts').transacting(req.trx).where('expense_id', req.params.id).delete()

  await knex('maha_audits').transacting(req.trx).where('auditable_type', 'maha_expenses').where('auditable_id', req.params.id).delete()

  await knex('maha_comments').transacting(req.trx).where('commentable_type', 'maha_expenses').where('commentable_id', req.params.id).delete()

  await activity(req, {
    story: 'deleted {object}',
    object: expense
  })

  const channels = [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/expenses/${expense.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }]

  await expense.destroy({
    transacting: req.trx
  })

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
