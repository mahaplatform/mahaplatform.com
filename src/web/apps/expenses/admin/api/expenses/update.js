import { createExpense, updateExpense, destroyExpense } from '../../../services/expenses'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Expense from '../../../models/expense'

const updateRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['line_items'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const expenses = await Promise.mapSeries(req.body.line_items, async(data) => {

    if(data.id) {

      const line_item = expense.related('line_items').find(line_item => {
        return line_item.get('id') === data.id
      })

      return await updateExpense(req, line_item, {
        ...req.body,
        ...data
      })

    }

    return await createExpense(req, {
      user_id: expense.get('user_id'),
      code: expense.get('code'),
      ...req.body,
      ...data
    })

  })

  await Promise.map(expense.related('line_items'), async (line_item) => {

    const found = expenses.find(expense => {
      return expense.get('id') === line_item.get('id')
    })

    if(!found) await destroyExpense(req, line_item)

  })

  await socket.refresh(req, [
    ...expenses.map(expense => `/admin/expenses/expenses/${expense.get('id')}`),
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }, {
      channel: 'team',
      target: [
        '/admin/expenses/approvals'
      ]
    }
  ])

  res.status(200).respond(expense, ExpenseSerializer)

}

export default updateRoute
