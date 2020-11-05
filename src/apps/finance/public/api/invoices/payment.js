import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import { makePayment } from '../../../services/payments'
import Invoice from '../../../models/invoice'

const paymentRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['customer','line_items','payments','program.logo','program.bank','team'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  req.team = invoice.related('team')

  await makePayment(req, {
    invoice,
    params: {
      bank_id: invoice.related('program').get('bank_id'),
      ...req.body
    }
  })

  await audit(req, {
    contact: invoice.related('customer'),
    story: 'payment made',
    auditable: invoice
  })

  await socket.refresh(req, [
    '/admin/finance/invoices',
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(true)

}

export default paymentRoute
