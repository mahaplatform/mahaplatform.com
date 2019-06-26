import { activity } from '../../../../../core/services/routes/activities'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import { completeItem } from '../../../services/items'
import Expense from '../../../models/expense'

const updateRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  await expense.save(whitelist(req.body, ['date','project_id','expense_type_id','vendor_id','account_id','description','amount','account']), {
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'expense',
    item: expense
  })

  await completeItem(req, {
    item: expense,
    required: ['date','receipt_ids','description','amount','project_id','expense_type_id','vendor_id','account_id']
  })

  await activity(req, {
    story: 'created {object}',
    object: expense
  })

  await audit(req, {
    story: 'updated',
    auditable: expense
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

  res.status(200).respond(expense, ExpenseSerializer)

}

export default updateRoute
