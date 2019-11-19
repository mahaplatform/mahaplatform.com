import VendorSerializer from '../../../serializers/vendor_serializer'
import Vendor from '../../../models/vendor'

const listRoute = async (req, res) => {

  const vendors = await Vendor.scope(qb => {
    qb.select(req.trx.raw('finance_vendors.*, count(finance_items.*) as items_count'))
    qb.leftJoin('finance_items', 'finance_items.vendor_id', 'finance_vendors.id')
    qb.groupBy('finance_vendors.id')
    qb.where('finance_vendors.team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    searchParams: ['name']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['name'],
    sortParams: ['id', 'name','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(vendors, VendorSerializer)

}

export default listRoute
