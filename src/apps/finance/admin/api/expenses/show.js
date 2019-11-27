import ExpenseSerializer from '../../../serializers/expense_serializer'
import Expense from '../../../models/expense'

const showRoute = async (req, res) => {

  const expense = await Expense.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','allocations.project','allocations.expense_type','vendor','account','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  res.status(200).respond(expense, ExpenseSerializer)

}

export default showRoute
