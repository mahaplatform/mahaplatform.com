import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'

const plansRoute = async (req, res) => {

  const plans = await Plan.filterFetch({
    scope: (qb) => {
      qb.whereRaw('competencies_plans.employee_id=?', req.params.id)
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      search: ['id','title']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['employee.photo','supervisor.photo','goals','commitments'],
    transacting: req.trx
  })

  res.status(200).respond(plans, PlanSerializer)

}

export default plansRoute
