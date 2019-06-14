import knex from '../../../core/services/knex'
import Receipt from '../models/receipt'
import _ from 'lodash'

export const createReceipts = async (req, { type, item }) => {

  if(!req.body.receipt_ids) return

  if(_.isEqual(req.body.receipt_ids.sort(), item.get('receipt_ids').sort())) return

  await knex('expenses_receipts').transacting(req.trx).where({
    [`${type}_id`]: item.get('id')
  }).del()

  await Promise.map(req.body.receipt_ids, async (asset_id, index) => {

    await Receipt.forge({
      team_id: req.team.get('id'),
      [`${type}_id`]: item.get('id'),
      delta: index,
      asset_id
    }).save(null, {
      transacting: req.trx
    })

  })

  await item.load(['receipts.asset'], {
    transacting: req.trx
  })

}
