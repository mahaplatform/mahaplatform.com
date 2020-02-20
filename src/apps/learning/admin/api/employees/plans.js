import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'

const plansRoute = async (req, res) => {

  const plans = await Plan.filter({
    scope: (qb) => {
      qb.whereRaw('competencies_plans.employee_id=?', req.params.id)
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    searchParams: ['id','title'],
    sort: req.query.$sort,
    defaultSort: 'created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['employee.photo','supervisor.photo','goals','commitments'],
    transacting: req.trx
  })

  res.status(200).respond(plans, PlanSerializer)

}

export default plansRoute
