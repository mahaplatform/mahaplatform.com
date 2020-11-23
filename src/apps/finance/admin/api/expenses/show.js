import ExpenseSerializer from '@apps/finance/serializers/expense_serializer'
import Expense from '@apps/finance/models/expense'

const showRoute = async (req, res) => {

  const expense = await Expense.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset','user','project.members','expense_type','allocations.project','allocations.expense_type','vendor','account','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  res.status(200).respond(expense, ExpenseSerializer)

}

export default showRoute
