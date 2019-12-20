import { activity } from '../../../../../core/services/routes/activities'
import CouponSerializer from '../../../serializers/coupon_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Coupon from '../../../models/coupon'

const createRoute = async (req, res) => {

  const coupon = await Coupon.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['code','product_id','amount','percent','is_active'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: coupon
  })

  await socket.refresh(req, [
    '/admin/finance/coupons'
  ])

  res.status(200).respond(coupon, CouponSerializer)

}

export default createRoute
