import { activity } from '@core/services/routes/activities'
import PaymentSerializer from '../../../serializers/payment_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { makePayment } from '../../../services/payments'
import Invoice from '../../../models/invoice'

const paymentRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.invoice_id)
  }).fetch({
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  const payment = await makePayment(req, {
    invoice,
    params: req.body
  })

  await payment.load(['payment_method'], {
    transacting: req.trx
  })

  await invoice.load(['payments'], {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: payment
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
    '/admin/finance/invoices',
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(payment, PaymentSerializer)

}

export default paymentRoute
