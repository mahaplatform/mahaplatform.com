import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseType from '../../../models/expense_type'

const listRoute = async (req, res) => {

  const expense_types = await ExpenseType.filterFetch({
    aliases: {
      expense_code: 'integration->\'expense_code\''
    },
    filter: {
      params: req.query.$filter,
      allowed: ['title','description','expense_code']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['expense_code'],
      allowed: ['id','title','is_active','expense_code','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(expense_types, ExpenseTypeSerializer)

}

export default listRoute
