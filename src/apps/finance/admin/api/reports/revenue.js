import RevenueSerializer from '../../../serializers/revenue_serializer'
import Revenue from '../../../models/revenue'

const revenueRoute = async (req, res) => {

  const revenues = await Revenue.filter({
    scope: (qb) => {
      qb.innerJoin('finance_customers','finance_customers.id','finance_revenues.customer_id')
      qb.innerJoin('crm_programs','crm_programs.id','finance_revenues.program_id')
      qb.innerJoin('finance_projects','finance_projects.id','finance_revenues.project_id')
      qb.innerJoin('finance_revenue_types','finance_revenue_types.id','finance_revenues.revenue_type_id')
      qb.where('finance_revenues.team_id', req.team.get('id'))
    },
    aliases: {
      customer: 'finance_customers.last_name',
      program: 'crm_programs.title',
      project: 'finance_projects.integration->>\'project_code\'',
      revenue_type: 'finance_revenue_types.integration->>\'revenue_code\''
    },
    filter: req.query.$filter,
    filterParams: ['customer_id','date','program_id','project_id','revenue_type_id'],
    searchParams: ['title'],
    sort: req.query.$sort,
    sortParams: ['customer','created_at','date','description','program','project','revenue_type','amount'],
    defaultSort: ['-created_at']
  }).fetchPage({
    withRelated: ['customer','program','project','revenue_type'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(revenues, RevenueSerializer)

}

export default revenueRoute
