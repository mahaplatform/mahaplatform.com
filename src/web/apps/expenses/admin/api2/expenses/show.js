import ExpenseSerializer from '../../../serializers/expense_serializer'
import Expense from '../../../models/expense'

const showRoute = async (req, res) => {

  const expense = await Expense.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  if(!expense) return req.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  res.status(200).respond(expense, (expense) => {
    return ExpenseSerializer(req, req.trx, expense)
  })

}

export default showRoute
