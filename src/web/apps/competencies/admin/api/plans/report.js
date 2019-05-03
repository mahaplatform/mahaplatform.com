import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'
import { ListRoute } from '../../../../../core/backframe'

const planResources = new ListRoute({
  defaultSort: ['created_at'],
  filterParams: ['employee_id','supervisor_id','due','status'],
  method: 'get',
  model: Plan,
  path: '/report',
  serializer: PlanSerializer,
  sortParams: ['created_at'],
  withRelated: ['employee.photo','supervisor.photo','goals','commitments']
})

export default planResources
