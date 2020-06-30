import AllocationSerializer from '../../../serializers/allocation_serializer'
import Allocation from '../../../models/allocation'

const revenueRoute = async (req, res) => {

  const allocations = await Allocation.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('finance_allocations.*,finance_allocation_details.*'))
      qb.innerJoin('finance_allocation_details','finance_allocation_details.allocation_id','finance_allocations.id')
      qb.innerJoin('finance_payments','finance_payments.id','finance_allocations.payment_id')
      qb.innerJoin('finance_invoices','finance_invoices.id','finance_payments.invoice_id')
      qb.innerJoin('finance_line_items','finance_line_items.id','finance_allocations.line_item_id')
      qb.innerJoin('finance_customers','finance_customers.id','finance_invoices.customer_id')
      qb.innerJoin('crm_programs','crm_programs.id','finance_invoices.program_id')
      qb.innerJoin('finance_projects','finance_projects.id','finance_line_items.project_id')
      qb.innerJoin('finance_revenue_types','finance_revenue_types.id','finance_line_items.revenue_type_id')
      qb.where('finance_allocations.team_id', req.team.get('id'))
    },
    aliases: {
      customer_id: 'finance_invoices.customer_id',
      program_id: 'finance_invoices.program_id',
      customer: 'finance_customers.last_name',
      created_at: 'finance_allocations.created_at',
      date: 'finance_payments.date',
      program: 'crm_programs.title',
      project: 'finance_projects.integration->\'project_code\'',
      revenue_type: 'finance_revenue_types.integration->\'revenue_code\''
    },
    filter: {
      params: req.query.$filter,
      allowed: ['customer_id','date','program_id','project_id','revenue_type_id'],
      search: ['title']
    },
    sort: {
      params: req.query.$sort,
      allowed: ['customer','created_at','date','description','program','project','revenue_type','amount'],
      defaults: ['-created_at']
    },
    page: req.query.$page,
    withRelated: ['payment.invoice.customer','payment.invoice.program','line_item.project','line_item.revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond(allocations, AllocationSerializer)

}

export default revenueRoute
