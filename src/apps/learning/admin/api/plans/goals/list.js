import GoalSerializer from '../../../../serializers/goal_serializer'
import Goal from '../../../../models/goal'

const listRoute = async (req, res) => {

  const goals = await Goal.scope(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('plan_id', req.params.plan_id)
  }).fetchPage({
    withRelated: ['competency'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(goals, GoalSerializer)

}

export default listRoute
