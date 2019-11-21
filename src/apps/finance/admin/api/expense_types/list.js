import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseType from '../../../models/expense_type'

const listRoute = async (req, res) => {

  const expense_types = await ExpenseType.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    aliases: {
      expense_code: 'integration->>\'expense_code\''
    },
    filter: req.query.$filter,
    searchParams: ['title','description','expense_code']
  }).sort({
    aliases: {
      expense_code: 'integration->>\'expense_code\''
    },
    sort: req.query.$sort,
    defaultSort: ['expense_code'],
    sortParams: ['id','title','is_active','expense_code','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(expense_types, ExpenseTypeSerializer)

}

export default listRoute
