import AccpacRevenueSerializer from '../../../../serializers/accpac_revenue_serializer'
import Allocation from '../../../../models/allocation'
import Batch from '../../../../models/batch'

const showRoute = async (req, res) => {

  const batch = await Batch.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('type', 'revenue')
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!batch) return res.status(404).respond({
    code: 404,
    message: 'Unable to load batch'
  })

  const allocations = await Allocation.query(qb => {
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
    qb.where('finance_allocations.batch_id', req.params.id)
  }).fetchAll({
    withRelated: ['payment.invoice.customer','payment.invoice.program','line_item.project','line_item.revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond({ batch, allocations }, AccpacRevenueSerializer)

}

export default showRoute
