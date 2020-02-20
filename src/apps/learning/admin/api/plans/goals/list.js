import GoalSerializer from '../../../../serializers/goal_serializer'
import Goal from '../../../../models/goal'

const listRoute = async (req, res) => {

  const goals = await Goal.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
      qb.where('plan_id', req.params.plan_id)
    },
    page: req.query.$page,
    withRelated: ['competency'],
    transacting: req.trx
  })

  res.status(200).respond(goals, GoalSerializer)

}

export default listRoute
