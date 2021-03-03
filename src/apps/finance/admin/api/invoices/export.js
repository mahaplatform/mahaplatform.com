import ExportInvoicesQueue from '@apps/finance/queues/export_invoices_queue'
import Invoice from '@apps/finance/models/invoice'

const exportRoute = async (req, res) => {

  const invoices = await Invoice.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (finance_invoices.code,finance_customers.last_name,finance_invoices.date,finance_invoice_details.total,finance_invoice_details.status,finance_invoices.created_at) finance_invoices.*,finance_invoice_details.*'))
      qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
      qb.innerJoin('finance_customers', 'finance_customers.id', 'finance_invoices.customer_id')
      qb.where('finance_invoices.team_id', req.team.get('id'))
    },
    aliases: {
      form_id: {
        column: 'crm_responses.form_id',
        leftJoin: [['invoice_id', 'finance_invoices.id']]
      },
      event_id: {
        column: 'events_registrations.event_id',
        leftJoin: [['invoice_id', 'finance_invoices.id']]
      },
      store_id: {
        column: 'stores_orders.store_id',
        leftJoin: [['invoice_id', 'finance_invoices.id']]
      },
      project_id: 'finance_line_items.project_id',
      program: 'crm_programs.title',
      customer: 'finance_customers.last_name',
      first_name: 'finance_customers.first_name',
      last_name: 'finance_customers.last_name',
      status: 'finance_invoice_details.status',
      total: 'finance_invoice_details.total'
    },
    filter: {
      params: req.body.filter,
      allowed: ['customer_id','program_id','status'],
      search: ['first_name','last_name']
    },
    transacting: req.trx
  })

  await ExportInvoicesQueue.enqueue(req, {
    invoice_ids: invoices.map(invoice => invoice.get('id')),
    to: req.body.to,
    subject: req.body.subject,
    message: req.body.message
  })

  res.status(200).respond(true)

}

export default exportRoute
