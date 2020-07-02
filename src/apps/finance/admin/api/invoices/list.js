import InvoiceSerializer from '../../../serializers/invoice_serializer'
import Invoice from '../../../models/invoice'

const listRoute = async (req, res) => {

  const invoices = await Invoice.filterFetch({
    scope: (qb) => {
      qb.select('finance_invoices.*','finance_invoice_details.*')
      qb.innerJoin('finance_invoice_details', 'finance_invoice_details.invoice_id', 'finance_invoices.id')
      qb.innerJoin('crm_programs', 'crm_programs.id', 'finance_invoices.program_id')
      qb.innerJoin('finance_customers', 'finance_customers.id', 'finance_invoices.customer_id')
      qb.where('finance_invoices.team_id', req.team.get('id'))
    },
    aliases: {
      program: 'crm_programs.title',
      customer: 'finance_customers.last_name',
      first_name: 'finance_customers.first_name',
      last_name: 'finance_customers.last_name',
      status: 'finance_invoice_details.status',
      total: 'finance_invoice_details.total'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['customer_id','program_id','status'],
      search: ['first_name','last_name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','code','customer','date','program','status','total','created_at']
    },
    page: req.query.$page,
    withRelated: ['customer','program'],
    transacting: req.trx
  })

  res.status(200).respond(invoices, InvoiceSerializer)

}

export default listRoute
