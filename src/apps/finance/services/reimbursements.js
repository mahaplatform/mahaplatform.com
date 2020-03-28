import { activity } from '../../../core/services/routes/activities'
import { whitelist } from '../../../core/services/routes/params'
import { audit } from '../../../core/services/routes/audit'
import { createReceipts } from '../services/receipts'
import Reimbursement from '../models/reimbursement'
import { completeItem } from '../services/items'
import moment from 'moment'

export const createReimbursement = async (req, params) => {

  const reimbursement = await Reimbursement.forge({
    team_id: req.team.get('id'),
    status: 'incomplete',
    ...whitelist(params, ['user_id','code','date','vendor_id','total','project_id','expense_type_id','description','amount'])
  }).save(null, {
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'reimbursement',
    item: reimbursement,
    receipt_ids: params.receipt_ids
  })

  await completeItem(req, {
    item: reimbursement,
    required: ['date','vendor_id','receipt_ids','total','project_id','expense_type_id','description','amount']
  })

  await activity(req, {
    story: 'created {object}',
    object: reimbursement
  })

  await audit(req, {
    story: 'created',
    auditable: reimbursement
  })

  return reimbursement

}

export const updateReimbursement = async (req, reimbursement, params) => {

  await reimbursement.save({
    ...whitelist(params, ['date','vendor_id','total','project_id','expense_type_id','description','amount'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'reimbursement',
    item: reimbursement,
    receipt_ids: params.receipt_ids
  })

  await completeItem(req, {
    item: reimbursement,
    required: ['date','vendor_id','receipt_ids','total','project_id','expense_type_id','description','amount'],
    status: reimbursement.get('status') === 'rejected' ? 'pending' : reimbursement.get('status')
  })

  await activity(req, {
    story: 'updated {object}',
    object: reimbursement
  })

  await audit(req, {
    story: 'updated',
    auditable: reimbursement
  })

  return reimbursement

}

export const destroyReimbursement = async (req, reimbursement) => {

  await reimbursement.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'deleted {object}',
    object: reimbursement
  })

}
