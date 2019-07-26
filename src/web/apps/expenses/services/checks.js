import { activity } from '../../../core/services/routes/activities'
import { whitelist } from '../../../core/services/routes/params'
import { audit } from '../../../core/services/routes/audit'
import { createReceipts } from '../services/receipts'
import { completeItem } from '../services/items'
import knex from '../../../core/services/knex'
import Check from '../models/check'

export const createCheck = async (req, params) => {

  const check = await Check.forge({
    team_id: req.team.get('id'),
    status_id: 1,
    ...whitelist(params, ['user_id','code','date_needed','vendor_id','delivery_method','project_id','expense_type_id','description','amount'])
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
    required: ['date_needed','vendor_id','delivery_method','receipt_ids','project_id','expense_type_id','description','amount']
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
    ...whitelist(params, ['date_needed','vendor_id','delivery_method','project_id','expense_type_id','description','amount'])
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
    required: ['date_needed','vendor_id','delivery_method','receipt_ids','project_id','expense_type_id','description','amount']
  })

  await activity(req, {
    story: 'update_neededd {object}',
    object: check
  })

  await audit(req, {
    story: 'update_neededd',
    auditable: check
  })

  return check

}

export const destroyCheck = async (req, check) => {

  await knex('expenses_receipts').transacting(req.trx).where('check_id', check.get('id')).delete()

  await knex('maha_audits').transacting(req.trx).where('auditable_type', 'expenses_checks').where('auditable_id', check.get('id')).delete()

  await knex('maha_comments').transacting(req.trx).where('commentable_type', 'expenses_checks').where('commentable_id', check.get('id')).delete()

  await activity(req, {
    story: 'deleted {object}',
    object: check
  })

  await check.destroy({
    transacting: req.trx
  })

}
