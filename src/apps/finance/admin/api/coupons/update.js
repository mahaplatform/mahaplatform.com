import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import CouponSerializer from '../../../serializers/coupon_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Coupon from '../../../models/coupon'

const updateRoute = async (req, res) => {

  const coupon = await Coupon.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!coupon) return res.status(404).respond({
    code: 404,
    message: 'Unable to load coupon'
  })

  await coupon.save({
    percent: req.body.percent ? parseFloat(req.body.percent) / 100 : null,
    max_uses: req.body.max_uses ? parseInt(req.body.max_uses): null,
    ...whitelist(req.body, ['code','product_id','type','amount','start_date','end_date'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: coupon
  })

  await socket.refresh(req, [
    '/admin/finance/coupons'
  ])

  res.status(200).respond(coupon, CouponSerializer)

}

export default updateRoute
