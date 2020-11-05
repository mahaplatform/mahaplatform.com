import ExpenseSerializer from '@apps/finance/serializers/expense_serializer'
import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import { createExpense } from '@apps/finance/services/expenses'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_items'
  })

  const allocations = req.body.allocations || [[]]

  const expenses = await Promise.mapSeries(allocations, async(allocation) => {

    return await createExpense(req, {
      user_id: req.user.get('id'),
      status: 'incomplete',
      code,
      ...req.body,
      ...allocation
    })

  })

  await socket.refresh(req, [
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  res.status(200).respond(expenses, ExpenseSerializer)

}

export default createRoute
