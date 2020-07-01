import AccpacDepositSerializer from '../../../../serializers/accpac_deposit_serializer'
import Deposit from '../../../../models/deposit'
import Allocation from '../../../../models/allocation'

const showRoute = async (req, res) => {

  const deposit = await Deposit.query(qb => {
    qb.select('finance_deposits.*','finance_deposit_totals.*')
    qb.innerJoin('finance_deposit_totals', 'finance_deposit_totals.deposit_id', 'finance_deposits.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['bank'],
    transacting: req.trx
  })

  if(!deposit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load deposit'
  })

  const allocations = await Allocation.query(qb => {
    qb.innerJoin('finance_payments','finance_payments.id','finance_allocations.payment_id')
    qb.innerJoin('finance_invoices','finance_invoices.id','finance_payments.invoice_id')
    qb.innerJoin('finance_line_items','finance_line_items.id','finance_allocations.line_item_id')
    qb.innerJoin('finance_customers','finance_customers.id','finance_invoices.customer_id')
    qb.innerJoin('crm_programs','crm_programs.id','finance_invoices.program_id')
    qb.innerJoin('finance_projects','finance_projects.id','finance_line_items.project_id')
    qb.innerJoin('finance_revenue_types','finance_revenue_types.id','finance_line_items.revenue_type_id')
    qb.where('finance_allocations.team_id', req.team.get('id'))
    qb.where('finance_payments.deposit_id', req.params.id)
  }).fetchAll({
    withRelated: ['payment.invoice.customer','payment.invoice.program','line_item.project','line_item.revenue_type'],
    transacting: req.trx
  })

  res.status(200).respond({ deposit, allocations }, AccpacDepositSerializer)

}

export default showRoute
