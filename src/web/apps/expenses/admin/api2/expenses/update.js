import { activity } from '../../../../../core/services/routes/activities'
import ExpenseSerializer from '../../../serializers/expense_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import { createReceipts } from '../../../services/receipts'
import Expense from '../../../models/expense'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  if(!expense) return req.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const allowed = _.pick(req.body, ['date','project_id','expense_type_id','vendor_id','account_id','description','amount','account'])

  const data = _.omitBy(allowed, _.isNil)

  await expense.save(data, {
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

export default updateRoute
