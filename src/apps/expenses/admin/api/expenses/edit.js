import getUserAccess from '../../../../../core/utils/get_user_access'
import Expense from '../../../models/expense'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const expense = await Expense.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','line_items.project.members'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const access = await getUserAccess(req, req.user)

  const is_admin = _.includes(access.rights, 'expenses:access_reports')

  res.status(200).respond(expense, (req, expense) => ({
    date: expense.get('date'),
    receipt_ids: expense.get('receipt_ids'),
    account_id: expense.get('account_id'),
    vendor_id: expense.get('vendor_id'),
    status: expense.get('status'),
    total: expense.get('total'),
    tax_total: expense.get('tax_total'),
    line_items: expense.related('line_items').map(line_item => {
      const is_owner_can_edit = line_item.get('owner_id') === req.user.get('id') && _.includes(['incomplete','pending','rejected'], line_item.get('status'))
      const is_approver_can_edit = _.includes(line_item.get('approver_ids'), req.user.get('id')) && _.includes(['incomplete','pending','submitted','approved','rejected'], line_item.get('status'))
      return {
        id: line_item.get('id'),
        project_id: line_item.get('project_id'),
        expense_type_id: line_item.get('expense_type_id'),
        description: line_item.get('description'),
        amount: line_item.get('amount'),
        can_edit: is_admin || is_owner_can_edit || is_approver_can_edit,
        can_delete: line_item.get('id') !== expense.get('id') && _.includes(['incomplete','pending'], line_item.get('status'))
      }
    })
  }))

}

export default editRoute
