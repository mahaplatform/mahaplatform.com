import { activity } from '@core/services/routes/activities'
import RefundSerializer from '@apps/finance/serializers/refund_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { refundPayment } from '@apps/finance/services/payments'
import Payment from '@apps/finance/models/payment'

const createRoute = async (req, res) => {

  const payment = await Payment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.payment_id)
  }).fetch({
    withRelated: ['allocations.line_item','invoice','refunds'],
    transacting: req.trx
  })

  if(!payment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load payment'
  })

  if(Number(req.body.amount) > Number(payment.get('refundable'))) return res.status(404).respond({
    code: 422,
    message: 'Invalid amount'
  })

  const refund = await refundPayment(req, {
    payment,
    allocations: req.body.allocations,
    amount: req.body.amount,
    type: req.body.type
  })

  await audit(req, {
    story: 'refunded',
    auditable: payment
  })

  await audit(req, {
    story: 'created',
    auditable: refund
  })

  await activity(req, {
    story: 'created {object}',
    object: refund
  })

  await socket.refresh(req, [
    '/admin/finance/payments',
    `/admin/finance/payments/${payment.get('id')}`,
    '/admin/finance/refunds'
  ])

  await res.status(200).respond(refund, RefundSerializer)

}

export default createRoute
