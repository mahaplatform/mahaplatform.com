import VendorSerializer from '@apps/finance/serializers/vendor_serializer'
import Vendor from '@apps/finance/models/vendor'

const listRoute = async (req, res) => {

  const vendors = await Vendor.filterFetch({
    scope: qb => {
      qb.select(req.trx.raw('finance_vendors.*, count(finance_items.*) as items_count'))
      qb.leftJoin('finance_items', 'finance_items.vendor_id', 'finance_vendors.id')
      qb.groupBy('finance_vendors.id')
      qb.where('finance_vendors.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['name'],
      allowed: ['id', 'name','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(vendors, VendorSerializer)

}

export default listRoute
