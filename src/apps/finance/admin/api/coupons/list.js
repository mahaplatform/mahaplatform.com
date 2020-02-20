import CouponSerializer from '../../../serializers/coupon_serializer'
import Coupon from '../../../models/coupon'

const listRoute = async (req, res) => {

  const coupons = await Coupon.filter({
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
    filter: req.query.$filter,
    filterParams: ['product_id'],
    searchParams: ['code'],
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','code','product','is_active','created_at']
  }).fetchPage({
    withRelated: ['product'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(coupons, CouponSerializer)

}

export default listRoute
