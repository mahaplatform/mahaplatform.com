import socket from '../../../../../core/services/routes/emitter'
import { destroyExpense } from '../../../services/expenses'
import Expense from '../../../models/expense'

const destroyRoute = async (req, res) => {

  const expense = await Expense.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const channels = [
    `/admin/expenses/expenses/${expense.get('id')}`,
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ]

  await destroyExpense(req, expense)

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
