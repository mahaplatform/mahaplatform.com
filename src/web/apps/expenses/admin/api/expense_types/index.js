import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseType from '../../../models/expense_type'
import { Resources } from '../../../../../core/backframe'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const defaultParams = (req, trx, options) => ({
  is_active: true
})

const channels = (req, trx, result, options) => [
  '/admin/expenses/expense_types'
]

const refresh = {
  create: channels,
  update: channels
}

const expenseTypeResources = new Resources({
  activities,
  allowedParams: ['title','description','integration','is_active'],
  defaultParams,
  defaultSort: 'title',
  refresh,
  model: ExpenseType,
  path: '/expense_types',
  serializer: ExpenseTypeSerializer,
  searchParams: ['title','description','integration->>\'expense_code\''],
  sortParams: ['id','title','created_at']
})

export default expenseTypeResources
