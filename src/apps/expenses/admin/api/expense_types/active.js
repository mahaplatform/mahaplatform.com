import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseType from '../../../models/expense_type'
import { Resources } from 'maha'

const defaultQuery = (req, trx, qb, options) => {

  qb.where({ is_active: true })

}

const expenseTypeResources = new Resources({
  defaultQuery,
  defaultSort: 'title',
  model: ExpenseType,
  path: '/expense_types/active',
  serializer: ExpenseTypeSerializer,
  searchParams: ['title','description','integration->>\'expense_code\''],
  sortParams: ['id','title','created_at']
})

export default expenseTypeResources
