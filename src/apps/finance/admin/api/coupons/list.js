import CouponSerializer from '../../../serializers/coupon_serializer'
import Coupon from '../../../models/coupon'

const listRoute = async (req, res) => {

  const coupons = await Coupon.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter,
    filterParams: ['product_id'],
    searchParams: ['code']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','code','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(coupons, CouponSerializer)

}

export default listRoute
