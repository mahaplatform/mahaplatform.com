import { ListRoute } from 'maha'
import Goal from '../../../models/goal'
import GoalSerializer from '../../../serializers/goal_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ plan_id: req.params.plan_id })

}

const employeePlanGoalsListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['-created_at'],
  model: Goal,
  method: 'get',
  path: '',
  serializer: GoalSerializer,
  withRelated: ['competency']
})

export default employeePlanGoalsListRoute
