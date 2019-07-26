import ExpenseSerializer from '../../../serializers/expense_serializer'
import generateCode from '../../../../../core/utils/generate_code'
import socket from '../../../../../core/services/routes/emitter'
import { createExpense } from '../../../services/expenses'

const createRoute = async (req, res) => {

  const code = generateCode()

  const expenses = await Promise.mapSeries(req.body.line_items, async(line_item) => {

    return await createExpense(req, {
      user_id: req.user.get('id'),
      status_id: 1,
      code,
      ...req.body,
      ...line_item
    })

  })

  await socket.refresh(req, [
    '/admin/expenses/approvals',
    '/admin/expenses/reports',
    {
      channel: 'user',
      target: '/admin/expenses/items'
    }
  ])

  res.status(200).respond(expenses, ExpenseSerializer)

}

export default createRoute
