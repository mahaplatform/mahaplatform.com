import { activity } from '@core/services/routes/activities'
import sendInvoiceQueue from '../../../queues/send_invoice_queue'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Invoice from '../../../models/invoice'

const sendRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','line_items','payments','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  await sendInvoiceQueue.enqueue(req, {
    invoice_id: invoice.get('id'),
    sender_id: req.body.sender_id,
    reply_to: req.body.reply_to,
    to: req.body.to,
    subject: req.body.subject,
    message: req.body.message
  })

  await audit(req, {
    story: 'sent',
    auditable: invoice
  })

  await activity(req, {
    story: 'sent {object}',
    object: invoice
  })

  await socket.refresh(req, [
    `/admin/finance/invoices/${invoice.get('id')}`
  ])

  res.status(200).respond(true)

}

export default sendRoute
