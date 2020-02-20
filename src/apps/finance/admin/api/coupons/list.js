import CouponSerializer from '../../../serializers/coupon_serializer'
import Coupon from '../../../models/coupon'

const listRoute = async (req, res) => {

  const coupons = await Coupon.filterFetch({
    scope: (qb) => {
      qb.select('finance_coupons.*','finance_coupon_statuses.is_active')
      qb.innerJoin('finance_coupon_statuses','finance_coupon_statuses.coupon_id','finance_coupons.id')
      qb.innerJoin('finance_products','finance_products.id','finance_coupons.product_id')
      qb.where('finance_coupons.team_id', req.team.get('id'))
    },
    aliases: {
      product: 'finance_products.title',
      is_active: 'finance_coupon_statuses.is_active'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['product_id'],
      search: ['code']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','code','product','is_active','created_at']
    },
    page: req.query.$page,
    withRelated: ['product'],
    transacting: req.trx
  })

  res.status(200).respond(coupons, CouponSerializer)

}

export default listRoute
