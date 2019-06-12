import VendorSerializer from '../../../serializers/vendor_serializer'
import knex from '../../../../../core/services/knex'
import Vendor from '../../../models/vendor'

const listRoute = async (req, res) => {

  const vendors = await Vendor.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.select(knex.raw('expenses_vendors.*, count(expenses_items.*) as items_count'))
    qb.leftJoin('expenses_items', 'expenses_items.vendor_id', 'expenses_vendors.id')
    qb.groupBy('expenses_vendors.id')
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

  res.status(200).respond(vendors, (vendor) => {
    return VendorSerializer(req, req.trx, vendor)
  })

}

export default listRoute
