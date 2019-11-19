import { activity } from '../../../core/services/routes/activities'
import { whitelist } from '../../../core/services/routes/params'
import { audit } from '../../../core/services/routes/audit'
import { createReceipts } from '../services/receipts'
import { completeItem } from '../services/items'
import Expense from '../models/expense'

export const createExpense = async (req, params) => {

  const expense = await Expense.forge({
    team_id: req.team.get('id'),
    status: 'incomplete',
    ...whitelist(params, ['user_id','code','date','vendor_id','account_id','total','tax_total','project_id','expense_type_id','description','amount','tax'])
  }).save(null, {
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'expense',
    item: expense,
    receipt_ids: params.receipt_ids
  })

  await completeItem(req, {
    item: expense,
    required: ['date','vendor_id','account_id','receipt_ids','total','tax_total','project_id','expense_type_id','description','amount','tax']
  })

  await activity(req, {
    story: 'created {object}',
    object: expense
  })

  await audit(req, {
    story: 'created',
    auditable: expense
  })

  return expense

}

export const updateExpense = async (req, expense, params) => {

  await expense.save({
    ...whitelist(params, ['date','account_id','vendor_id','total','tax_total','project_id','expense_type_id','description','amount','tax'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'expense',
    item: expense,
    receipt_ids: params.receipt_ids
  })

  await completeItem(req, {
    item: expense,
    required: ['date','account_id','vendor_id','receipt_ids','total','tax_total','project_id','expense_type_id','description','amount','tax']
  })

  await activity(req, {
    story: 'updated {object}',
    object: expense
  })

  await audit(req, {
    story: 'updated',
    auditable: expense
  })

  return expense

}

export const destroyExpense = async (req, expense) => {

  await req.trx('finance_receipts').where('expense_id', expense.get('id')).delete()

  await req.trx('maha_audits').where('auditable_type', 'finance_expenses').where('auditable_id', expense.get('id')).delete()

  await req.trx('maha_comments').where('commentable_type', 'finance_expenses').where('commentable_id', expense.get('id')).delete()

  await activity(req, {
    story: 'deleted {object}',
    object: expense
  })

  await expense.destroy({
    transacting: req.trx
  })

}
