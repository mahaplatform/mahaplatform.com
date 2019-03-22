import ExpenseSerializer from '../../../serializers/expense_serializer'
import Expense from '../../../models/expense'
import Receipt from '../../../models/receipt'
import itemResources from './item'
import _ from 'lodash'

export const afterProcessor = async (req, trx, result, options) => {

  if(!req.body.receipt_ids) return

  if(_.isEqual(req.body.receipt_ids.sort(), result.get('receipt_ids').sort())) return

  await options.knex('expenses_receipts').transacting(trx).where({
    expense_id: result.get('id')
  }).del()

  await Promise.map(req.body.receipt_ids, async (asset_id, index) => {

    await Receipt.forge({
      team_id: req.team.get('id'),
      expense_id: result.get('id'),
      delta: index,
      asset_id
    }).save(null, { transacting: trx })

  })

  await result.load(['receipts.asset'], { transacting: trx })

}

const beforeProcessor = async (req, trx, options) => {

  await Promise.mapSeries(req.resource.related('receipts').map(receipt => receipt), async receipt => {

    const asset = receipt.related('asset')

    await receipt.destroy({ transacting: trx })

    await asset.destroy({ transacting: trx })

  })

}

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_expenses.project_id')

  qb.leftJoin('expenses_vendors', 'expenses_vendors.id', 'expenses_expenses.vendor_id')

  qb.leftJoin('expenses_accounts', 'expenses_accounts.id', 'expenses_expenses.account_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_expenses.status_id')

}

const expenseResources = itemResources({
  afterProcessor,
  allowedParams: ['date','project_id','expense_type_id','vendor_id','account_id','description','amount','account'],
  beforeProcessor,
  defaultQuery,
  defaultSort: '-date',
  dependents: [
    { relationship: 'receipts', strategy: 'destroy' }
  ],
  filterParams: ['expense_type_id','project_id','date','account_id','status_id'],
  model: Expense,
  name: 'expense',
  required: ['date','receipt_ids','description','amount','project_id','expense_type_id','vendor_id','account_id'],
  serializer: ExpenseSerializer,
  searchParams: ['description','expenses_projects.title','expenses_vendors.name','expenses_accounts.name','description'],
  sortParams: ['id','date','expenses_projects.title','expenses_vendors.name','expenses_accounts.name','description','amount','expenses_statuses.text','created_at'],
  virtualParams: ['receipt_ids'],
  withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor','account']
})

export default expenseResources
