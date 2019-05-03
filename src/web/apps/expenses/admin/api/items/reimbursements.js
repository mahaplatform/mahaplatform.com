import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import Reimbursement from '../../../models/reimbursement'
import Receipt from '../../../models/receipt'
import itemResources from './item'
import _ from 'lodash'

export const afterProcessor = async (req, trx, result, options) => {

  if(!req.body.receipt_ids) return

  if(_.isEqual(req.body.receipt_ids.sort(), result.get('receipt_ids').sort())) return

  const conditions = {
    reimbursement_id: result.get('id')
  }

  await options.knex('expenses_receipts').transacting(trx).where(conditions).del()

  await Promise.map(req.body.receipt_ids, async (asset_id, index) => {

    const data = {
      team_id: req.team.get('id'),
      reimbursement_id: result.get('id'),
      delta: index,
      asset_id
    }

    await Receipt.forge(data).save(null, { transacting: trx })

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

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_reimbursements.project_id')

  qb.leftJoin('expenses_vendors', 'expenses_vendors.id', 'expenses_reimbursements.vendor_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_reimbursements.status_id')

}

const reimbursementResources = itemResources({
  afterProcessor,
  allowedParams: ['date','project_id','expense_type_id','vendor_id','description','amount'],
  beforeProcessor,
  defaultQuery,
  defaultSort: '-date',
  dependents: [
    { relationship: 'receipts', strategy: 'destroy' }
  ],
  filterParams: ['expense_type_id','project_id','date','status_id'],
  model: Reimbursement,
  name: 'reimbursement',
  required: ['date','receipt_ids','description','amount','project_id','expense_type_id','vendor_id'],
  serializer: ReimbursementSerializer,
  searchParams: ['description','expenses_projects.title','expenses_vendors.name','description'],
  sortParams: ['id','date','expenses_projects.title','expenses_vendors.name','description','amount','expenses_statuses.text','created_at'],
  virtualParams: ['receipt_ids'],
  withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor']
})

export default reimbursementResources
