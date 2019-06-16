import Expense from '../../../models/expense'

const editRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','user','project','expense_type','status','vendor','account'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  res.status(200).respond(expense, {
    fields: [
      'id',
      'date',
      'description',
      'amount',
      'receipt_ids',
      'project_id',
      'expense_type_id',
      'vendor_id',
      'account_id'
    ]
  })

}

export default editRoute
