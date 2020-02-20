import socket from '../../../../../core/services/routes/emitter'
import { destroyExpense } from '../../../services/expenses'
import Expense from '../../../models/expense'

const destroyRoute = async (req, res) => {

  const expense = await Expense.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const channels = [
    `/admin/finance/expenses/${expense.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ]

  await destroyExpense(req, expense)

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
