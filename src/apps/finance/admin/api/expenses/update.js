import { createExpense, updateExpense, destroyExpense } from '../../../services/expenses'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Expense from '../../../models/expense'

const getAllocations = (item, allocations) => {
  const items = !allocations || allocations.length === 0 ? [{}] : allocations
  return items.map((allocation, index) => ({
    ...allocation,
    id: index === 0 && !allocation.id ? item.get('id') : allocation.id
  }))
}

const updateRoute = async (req, res) => {

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

  const allocations = await Expense.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('code', expense.get('code'))
  }).fetchAll({
    transacting: req.trx
  })

  const new_allocations = getAllocations(expense, req.body.allocations)

  const expenses = await Promise.mapSeries(new_allocations, async(data) => {

    if(!data.id) {
      return await createExpense(req, {
        user_id: expense.get('user_id'),
        code: expense.get('code'),
        ...req.body,
        ...data
      })
    }

    const allocation = allocations.find(allocation => {
      return allocation.get('id') === data.id
    })

    return await updateExpense(req, allocation, {
      ...req.body,
      ...data
    })

  })

  await Promise.map(allocations, async (allocation) => {

    const found = expenses.find(expense => {
      return expense.get('id') === allocation.get('id')
    })

    if(!found) await destroyExpense(req, allocation)

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
