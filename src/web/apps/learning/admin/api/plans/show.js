import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'

const showRoute = async (req, res) => {

  const plan = await Plan.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['audit.story','audit.user.photo','employee.photo','supervisor.photo','goals','commitments'],
    transacting: req.trx
  })

  if(!plan) return res.status(404).respond({
    code: 404,
    message: 'Unable to load plan'
  })

  res.status(200).respond(plan, PlanSerializer)

}

export default showRoute
