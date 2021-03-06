import ExpenseTypeSerializer from '@apps/finance/serializers/expense_type_serializer'
import ExpenseType from '@apps/finance/models/expense_type'

const showRoute = async (req, res) => {

  const expense_type = await ExpenseType.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense_type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense type'
  })

  await res.status(200).respond(expense_type, ExpenseTypeSerializer)

}

export default showRoute
