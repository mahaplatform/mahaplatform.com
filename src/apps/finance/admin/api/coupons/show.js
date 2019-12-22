import CouponSerializer from '../../../serializers/coupon_serializer'
import Coupon from '../../../models/coupon'

const showRoute = async (req, res) => {

  const coupon = await Coupon.query(qb => {
    qb.select('finance_coupons.*','finance_coupon_statuses.is_active')
    qb.innerJoin('finance_coupon_statuses','coupon_id','id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['product'],
    transacting: req.trx
  })

  if(!coupon) return res.status(404).respond({
    code: 404,
    message: 'Unable to load coupon'
  })

  res.status(200).respond(coupon, CouponSerializer)

}

export default showRoute
