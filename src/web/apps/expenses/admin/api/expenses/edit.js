import Expense from '../../../models/expense'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const expense = await Expense.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','line_items'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  res.status(200).respond(expense, (req, expense) => ({
    date: expense.get('date'),
    receipt_ids: expense.get('receipt_ids'),
    vendor_id: expense.get('vendor_id'),
    total: expense.get('total'),
    tax_total: expense.get('tax_total'),
    line_items: expense.related('line_items').map(line_item => ({
      id: line_item.get('id'),
      project_id: line_item.get('project_id'),
      expense_type_id: line_item.get('expense_type_id'),
      description: line_item.get('description'),
      amount: line_item.get('amount'),
      editable: _.includes([1,2,5], line_item.get('status_id'))
    }))
  }))

}

export default editRoute
