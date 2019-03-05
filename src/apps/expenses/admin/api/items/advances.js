import AdvanceSerializer from '../../../serializers/advance_serializer'
import Advance from '../../../models/advance'
import itemResources from './item'

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('expenses_projects', 'expenses_projects.id', 'expenses_advances.project_id')

  qb.leftJoin('expenses_statuses', 'expenses_statuses.id', 'expenses_advances.status_id')

}

const advanceResources = itemResources({
  allowedParams: ['project_id','expense_type_id','date_needed','description','amount','description'],
  defaultQuery,
  defaultSort: '-created_at',
  filterParams: ['expense_type_id','project_id','date_needed','status_id'],
  model: Advance,
  name: 'advance',
  required: ['date_needed','description','amount','project_id','expense_type_id'],
  serializer: AdvanceSerializer,
  searchParams: ['description','expenses_projects.title','description'],
  sortParams: ['id','date_needed','expenses_projects.title','description','amount','expenses_statuses.text','created_at'],
  withRelated: ['user','project.members','expense_type','status']
})

export default advanceResources
