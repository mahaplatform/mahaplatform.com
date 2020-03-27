import socket from '../../../../../core/services/routes/emitter'
import Expense from '../../../models/expense'
import moment from 'moment'

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

  await expense.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/finance/expenses/${expense.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(true)

}

export default destroyRoute
