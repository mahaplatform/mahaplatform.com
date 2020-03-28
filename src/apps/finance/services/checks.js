import { activity } from '../../../core/services/routes/activities'
import { whitelist } from '../../../core/services/routes/params'
import { audit } from '../../../core/services/routes/audit'
import { createReceipts } from '../services/receipts'
import { completeItem } from '../services/items'
import Check from '../models/check'
import moment from 'moment'

export const createCheck = async (req, params) => {

  const check = await Check.forge({
    team_id: req.team.get('id'),
    status: 'incomplete',
    ...whitelist(params, ['user_id','code','date_needed','vendor_id','delivery_method','invoice_number','account_number','total','tax_total','project_id','expense_type_id','description','amount','tax'])
  }).save(null, {
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'check',
    item: check,
    receipt_ids: params.receipt_ids
  })

  await completeItem(req, {
    item: check,
    required: ['date_needed','vendor_id','delivery_method','receipt_ids','total','tax_total','project_id','expense_type_id','description','amount','tax'],
    status: check.get('status') === 'rejected' ? 'pending' : check.get('status')
  })

  await activity(req, {
    story: 'created {object}',
    object: check
  })

  await audit(req, {
    story: 'created',
    auditable: check
  })

  return check

}

export const updateCheck = async (req, check, params) => {

  await check.save({
    ...whitelist(params, ['date_needed','vendor_id','delivery_method','invoice_number','account_number','total','tax_total','project_id','expense_type_id','description','amount','tax'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await createReceipts(req, {
    type: 'check',
    item: check,
    receipt_ids: params.receipt_ids
  })

  await completeItem(req, {
    item: check,
    required: ['date_needed','vendor_id','delivery_method','receipt_ids','total','tax_total','project_id','expense_type_id','description','amount','tax']
  })

  await activity(req, {
    story: 'updated {object}',
    object: check
  })

  await audit(req, {
    story: 'updated',
    auditable: check
  })

  return check

}

export const destroyCheck = async (req, check) => {

  await check.save({
    deleted_at: moment()
  }, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'deleted {object}',
    object: check
  })

}
