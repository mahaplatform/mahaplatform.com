import InvoiceSerializer from '../serializers/invoice_serializer'
import { send_email } from '../../maha/services/emails'
import Queue from '../../../core/objects/queue'
import Sender from '../../crm/models/sender'
import Invoice from '../models/invoice'

const processor = async (job, trx) => {

  const { invoice_id, sender_id, reply_to, to, subject, message } = job.data

  const invoice = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.where('finance_invoices.id', invoice_id)
  }).fetch({
    withRelated: ['customer','coupon','invoice_line_items','payments.payment_method','program.logo','team'],
    transacting: trx
  })

  const req = {
    team: invoice.related('team'),
    trx
  }

  const sender = await Sender.query(qb => {
    qb.where('program_id', invoice.get('program_id'))
    qb.where('is_verified', true)
    qb.where('id', sender_id)
  }).fetch({
    transacting: req.trx
  })

  await send_email(req, {
    team_id: req.team.get('id'),
    from: sender.get('rfc822'),
    reply_to,
    to,
    template: 'finance:invoice',
    subject,
    maha: false,
    data: {
      invoice: InvoiceSerializer(req, invoice),
      message
    }
  })

}

const failed = async (job, err) => {}

const SendInvoiceQueue = new Queue({
  name: 'send_invoice',
  enqueue: async (req, job) => job,
  processor,
  failed
})

export default SendInvoiceQueue
