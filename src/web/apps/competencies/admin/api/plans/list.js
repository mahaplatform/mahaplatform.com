import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'

const listRoute = async (req, res) => {

  const plans = await Plan.scope({
    team: req.team
  }).query(qb => {
    qb.whereRaw('competencies_plans.employee_id=? or competencies_plans.supervisor_id=?', [req.user.get('id'),req.user.get('id')])
  }).filter({
    filter: req.query.$filter,
    searchParams: ['id','title']
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['employee.photo','supervisor.photo','goals','commitments'],
    transacting: req.trx
  })

  res.status(200).respond(plans, (plan) => {
    return PlanSerializer(req, plan)
  })

}

export default listRoute
