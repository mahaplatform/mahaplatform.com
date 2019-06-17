import socket from '../../../../../core/services/routes/emitter'
import knex from '../../../../../core/services/knex'

const mergeRoute = async (req, res) => {

  const vendor_id = req.params.id

  const new_vendor_id = req.body.vendor_id

  await knex('expenses_reimbursements').transacting(req.trx).where({
    vendor_id
  }).update({
    vendor_id: new_vendor_id
  })

  await knex('expenses_expenses').transacting(req.trx).where({
    vendor_id
  }).update({
    vendor_id: new_vendor_id
  })

  await knex('expenses_checks').transacting(req.trx).where({
    vendor_id
  }).update({
    vendor_id: new_vendor_id
  })

  await knex('expenses_vendors').transacting(req.trx).where({
    id: req.params.id
  }).del()

  await socket.refresh(req, [
    '/admin/expenses/vendors'
  ])

  res.status(200).respond(true)

}

export default mergeRoute
