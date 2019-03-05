import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const vendor_id = req.params.id

  const new_vendor_id = req.body.vendor_id

  await options.knex('expenses_reimbursements').transacting(trx).where({ vendor_id }).update({ vendor_id: new_vendor_id })

  await options.knex('expenses_expenses').transacting(trx).where({ vendor_id }).update({ vendor_id: new_vendor_id })

  await options.knex('expenses_checks').transacting(trx).where({ vendor_id }).update({ vendor_id: new_vendor_id })

  await options.knex('expenses_vendors').transacting(trx).where({ id: req.params.id }).del()

  return true

}

const refresh = (req, trx, result, options) => [
  '/admin/expenses/vendors'
]

const mergeRoute = new Route({
  method: 'patch',
  path: '/merge',
  processor,
  refresh
})

export default mergeRoute
