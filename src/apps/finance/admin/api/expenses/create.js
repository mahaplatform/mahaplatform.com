import ExpenseSerializer from '../../../serializers/expense_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import { createExpense } from '../../../services/expenses'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'finance_expenses'
  })

  const line_items = req.body.line_items || [[]]

  const expenses = await Promise.mapSeries(line_items, async(line_item) => {

    return await createExpense(req, {
      user_id: req.user.get('id'),
      status: 'incomplete',
      code,
      ...req.body,
      ...line_item
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
