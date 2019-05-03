import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'
import { ListRoute } from '../../../../../core/backframe'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const defaultQuery = (req, trx, qb, options) => {

  qb.where('employee_id', req.params.employee_id)

  qb.where('supervisor_id', req.user.get('id'))

}

const employeePlanRoute = new ListRoute({
  activity,
  defaultQuery,
  defaultSort: ['-due'],
  method: 'get',
  model: Plan,
  name: 'plan',
  path: '/employees/:employee_id/plans',
  serializer: PlanSerializer,
  withRelated: ['employee.photo','supervisor.photo','goals','commitments']
})

export default employeePlanRoute
