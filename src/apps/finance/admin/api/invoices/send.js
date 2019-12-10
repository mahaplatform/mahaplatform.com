import InvoiceSerializer from '../../../serializers/invoice_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import send_email from '../../../../maha/queues/send_email_queue'
import { audit } from '../../../../../core/services/routes/audit'
import Sender from '../../../../crm//models/sender'
import Invoice from '../../../models/invoice'

const sendRoute = async (req, res) => {

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','coupon','line_items.product','payments','program.logo'],
    transacting: req.trx
  })

  if(!invoice) return res.status(404).respond({
    code: 404,
    message: 'Unable to load invoice'
  })

  const sender = await Sender.query(qb => {
    qb.where('program_id', invoice.get('program_id'))
    qb.where('is_verified', true)
    qb.where('id', req.body.sender_id)
  }).fetch({
    transacting: req.trx
  })

  await send_email.enqueue(req, {
    team_id: req.team.get('id'),
    from: sender.get('rfc822'),
    to: req.body.to,
    template: 'finance:invoice',
    subject: req.body.subject,
    maha: false,
    data: {
      message: req.body.message,
      invoice: InvoiceSerializer(req, invoice)
    }
  })

  await audit(req, {
    story: 'sent',
    auditable: invoice
  })

  await activity(req, {
    story: 'sent {object}',
    object: invoice
  })

  res.status(200).respond(true)

}

export default sendRoute
