import VendorSerializer from '../../../serializers/vendor_serializer'
import Vendor from '../../../models/vendor'
import { Resources } from '../../../../../core/backframe'
import merge from './merge'

const defaultParams = (req, trx) => ({
  integration: {}
})

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('expenses_vendors.*, count(expenses_items.*) as items_count'))

  qb.leftJoin('expenses_items', 'expenses_items.vendor_id', 'expenses_vendors.id')

  qb.groupBy('expenses_vendors.id')

}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/expenses/vendors'
  ],
  update: (req, trx, result, options) => [
    '/admin/expenses/vendors',
    `/admin/expenses/vendors/${req.params.id}`
  ]
}

const vendorResources = new Resources({
  allowedParams: ['name','address_1','address_2','city','state','zip','integration'],
  defaultParams,
  defaultQuery,
  defaultSort: 'name',
  memberActions: [
    merge
  ],
  model: Vendor,
  path: '/vendors',
  refresh,
  searchParams: ['name'],
  serializer: VendorSerializer,
  sortParams: ['id', 'name','created_at']
})

export default vendorResources
