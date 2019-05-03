import CheckSerializer from '../../../serializers/check_serializer'
import Receipt from '../../../models/receipt'
import Check from '../../../models/check'
import itemResources from './item'
import _ from 'lodash'

export const afterProcessor = async (req, trx, result, options) => {

  if(!req.body.receipt_ids) return

  if(_.isEqual(req.body.receipt_ids.sort(), result.get('receipt_ids').sort())) return

  const conditions = {
    check_id: result.get('id')
  }

  await options.knex('expenses_receipts').transacting(trx).where(conditions).del()

  await Promise.map(req.body.receipt_ids, async (asset_id, index) => {

    const data = {
      team_id: req.team.get('id'),
      check_id: result.get('id'),
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

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_checks.project_id')

  qb.leftJoin('expenses_vendors', 'expenses_vendors.id', 'expenses_checks.vendor_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_checks.status_id')

}

const checkResources = itemResources({
  afterProcessor,
  allowedParams: ['project_id','expense_type_id','vendor_id','delivery_method','date_needed','description','amount','description'],
  beforeProcessor,
  defaultQuery,
  defaultSort: '-created_at',
  dependents: [
    { relationship: 'receipts', strategy: 'destroy' }
  ],
  filterParams: ['expense_type_id','project_id','date_needed','status_id'],
  model: Check,
  name: 'check',
  required: ['date_needed','description','amount','project_id','expense_type_id','vendor_id','delivery_method'],
  serializer: CheckSerializer,
  searchParams: ['description','expenses_projects.title','expenses_vendors.name','description'],
  sortParams: ['id','date_needed','expenses_projects.title','expenses_vendors.name','description','amount','expenses_statuses.text','created_at'],
  virtualParams: ['receipt_ids'],
  withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor']
})

export default checkResources
