import { Resources } from 'maha'
import Account from '../../../models/account'

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/expenses/accounts'
  ],
  update: (req, trx, result, options) => [
    '/admin/expenses/accounts',
    `/admin/expenses/accounts/${req.params.id}`
  ]
}

const accountResources = new Resources({
  allowedParams: ['name','integration'],
  defaultSort: 'name',
  model: Account,
  path: '/accounts',
  refresh,
  searchParams: ['name'],
  sortParams: ['id', 'name','created_at']
})

export default accountResources
