import Expense from '../../../models/expense'

const editRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts'],
    transacting: req.trx
  })

  if(!expense) return req.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const serializer = (req, expense) => ({
    id: expense.get('id'),
    date: expense.get('date'),
    description: expense.get('description'),
    amount: expense.get('amount'),
    receipt_ids: expense.get('receipt_ids'),
    project_id: expense.get('project_id'),
    expense_type_id: expense.get('expense_type_id'),
    vendor_id: expense.get('vendor_id'),
    account_id: expense.get('account_id')
  })

  res.status(200).respond(expense, serializer)

}

export default editRoute
