import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseType from '../../../models/expense_type'

const listRoute = async (req, res) => {

  const expense_types = await ExpenseType.scope({
    team: req.team
  }).query(qb => {
    qb.where('is_active', true)
  }).filter({
    filter: req.query.$filter,
    searchParams: ['title','description','integration->>\'expense_code\'']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['title'],
    sortParams: ['id','title','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(expense_types, (expense_type) => {
    return ExpenseTypeSerializer(req, expense_type)
  })

}

export default listRoute
