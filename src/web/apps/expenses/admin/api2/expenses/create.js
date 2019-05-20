import { activity } from '../../../../../core/services/routes/activities'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import Expense from '../../../models/expense'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['date','project_id','expense_type_id','vendor_id','account_id','description','amount','account'])

  const data = _.omitBy(allowed, _.isNil)

  const expense = await Expense.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status_id: 1,
    ...data
  }).save(null, {
    transacting: req.trx
  })

  await createReceipts(req, 'expense', expense)

  await activity(req, {
    story: 'created {object}',
    object: expense
  })

  await audit(req, {
    story: 'created',
    auditable: {
      tableName: 'expenses_expenses',
      id: expense.get('id')
    }
  })

  await socket.refresh(req, [{
    channel: 'user',
    target: '/admin/expenses/items'
  }, {
    channel: 'team',
    target: [
      `/admin/expenses/expenses/${expense.get('id')}`,
      '/admin/expenses/approvals',
      '/admin/expenses/reports'
    ]
  }])

  res.status(200).respond(expense, (expense) => {
    return ExpenseSerializer(req, req.trx, expense)
  })

}

export default createRoute
