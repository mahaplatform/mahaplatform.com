import PlanSerializer from '../../../serializers/plan_serializer'
import Plan from '../../../models/plan'
import { ListRoute } from 'maha'

const defaultQuery = (req, trx, qb, options) => {

  qb.whereRaw('(competencies_plans.employee_id=? or competencies_plans.supervisor_id=?)', [req.user.get('id'),req.user.get('id')])

}

const planResources = new ListRoute({
  defaultQuery,
  defaultSort: ['created_at'],
  filterParams: ['employee_id','supervisor_id','due','status'],
  method: 'get',
  model: Plan,
  path: '/items',
  serializer: PlanSerializer,
  sortParams: ['created_at'],
  withRelated: ['employee.photo','supervisor.photo','goals','commitments']
})

export default planResources
