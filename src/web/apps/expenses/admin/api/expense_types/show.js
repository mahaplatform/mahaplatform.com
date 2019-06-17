import ExpenseTypeSerializer from '../../../serializers/expense_type_serializer'
import ExpenseType from '../../../models/expense_type'

const showRoute = async (req, res) => {

  const expense_type = await ExpenseType.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!expense_type) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense type'
  })

  res.status(200).respond(expense_type, ExpenseTypeSerializer)

}

export default showRoute
