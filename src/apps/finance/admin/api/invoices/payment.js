import { activity } from '../../../../../core/services/routes/activities'
import PaymentSerializer from '../../../serializers/payment_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Payment from '../../../models/payment'
import Invoice from '../../../models/invoice'

const paymentRoute = async (req, res) => {

  const invoice = await Invoice.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.invoice_id)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  const payment = await Payment.forge({
    team_id: req.team.get('id'),
    invoice_id: invoice.get('id'),
    ...whitelist(req.body, ['date','method','credit_id','scholarship_id','reference','amount'])
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'payment received',
    auditable: invoice
  })

  await activity(req, {
    story: 'received payment for {object}',
    object: invoice
  })

  await socket.refresh(req, [
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(payment, PaymentSerializer)

}

export default paymentRoute
