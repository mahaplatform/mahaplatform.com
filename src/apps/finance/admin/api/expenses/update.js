import { createExpense, updateExpense, destroyExpense } from '../../../services/expenses'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Expense from '../../../models/expense'

const getLineItems = (item, line_items) => {
  const items = !line_items || line_items.length === 0 ? [{}] : line_items
  return items.map((line_item, index) => ({
    ...line_item,
    id: index === 0 && !line_item.id ? item.get('id') : line_item.id
  }))
}

const updateRoute = async (req, res) => {

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

  const line_items = await Expense.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('code', expense.get('code'))
  }).fetchAll({
    transacting: req.trx
  })

  const new_line_items = getLineItems(expense, req.body.line_items)

  const expenses = await Promise.mapSeries(new_line_items, async(data) => {

    if(!data.id) {
      return await createExpense(req, {
        user_id: expense.get('user_id'),
        code: expense.get('code'),
        ...req.body,
        ...data
      })
    }

    const line_item = line_items.find(line_item => {
      return line_item.get('id') === data.id
    })

    return await updateExpense(req, line_item, {
      ...req.body,
      ...data
    })

  })

  await Promise.map(line_items, async (line_item) => {

    const found = expenses.find(expense => {
      return expense.get('id') === line_item.get('id')
    })

    if(!found) await destroyExpense(req, line_item)

  })

  await socket.refresh(req, [
    ...expenses.map(expense => `/admin/finance/expenses/${expense.get('id')}`),
    '/admin/finance/reports',
    '/admin/finance/approvals',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(expense, ExpenseSerializer)

}

export default updateRoute
