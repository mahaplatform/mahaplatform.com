import GoalSerializer from '../../../../serializers/goal_serializer'
import Goal from '../../../../models/goal'

const listRoute = async (req, res) => {

  const goals = await Goal.scope({
    team: req.team
  }).query(qb => {
    qb.where('plan_id', req.params.plan_id)
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at'
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(goals, (goal) => {
    return GoalSerializer(req, req.trx, goal)
  })

}

export default listRoute
