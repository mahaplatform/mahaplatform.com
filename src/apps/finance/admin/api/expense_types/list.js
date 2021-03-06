import ExpenseTypeSerializer from '@apps/finance/serializers/expense_type_serializer'
import ExpenseType from '@apps/finance/models/expense_type'

const listRoute = async (req, res) => {

  const expense_types = await ExpenseType.filterFetch({
    scope: (qb) => {
      qb.where('is_active',true)
    },
    aliases: {
      expense_code: 'integration->\'expense_code\''
    },
    filter: {
      params: req.query.$filter,
      search: ['title','description','expense_code']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['expense_code'],
      allowed: ['id','title','expense_code','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(expense_types, ExpenseTypeSerializer)

}

export default listRoute
