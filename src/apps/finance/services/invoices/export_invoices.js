import { generatePDF } from '@apps/finance/services/invoices'
import Invoice from '@apps/finance/models/invoice'
import { sendMail } from '@core/services/email'
import { upload } from '@core/services/aws/s3'
import { zip } from '@core/services/zip'
import moment from 'moment'

const sendInvoices = async (req, job) => {

  const invoices = await Invoice.query(qb => {
    qb.select('finance_invoices.*','finance_invoice_details.*')
    qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
    qb.whereIn('id', job.data.invoice_ids)
  }).fetchAll({
    withRelated: ['customer','invoice_line_items','payments.payment_method','program.logo'],
    transacting: req.trx
  })

  const files = await Promise.mapSeries(invoices, async (invoice) => ({
    name: `invoice-${invoice.get('code')}.pdf`,
    data: await generatePDF(req, {
      invoice
    })
  }))

  const data = await zip({
    files
  })

  const timestamp = moment().format('YYYYMMDDhhmmss')

  const key = `attachments/invoices-${timestamp}.zip`

  await upload(req, {
    acl: 'public-read',
    bucket: process.env.AWS_BUCKET,
    key,
    file_data: data,
    expires: moment().add(2, 'weeks').toISOString()
  })

  await sendMail({
    from: req.team.get('rfc822'),
    to: job.data.to,
    subject: job.data.subject,
    html: `
      ${job.data.message}

      ${process.env.AWS_BUCKET}/${key}
    `
  })

}

export default sendInvoices
