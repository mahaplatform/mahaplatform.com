import getUserAccess from '@core/utils/get_user_access'
import Expense from '@apps/finance/models/expense'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const expense = await Expense.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','allocations.project.members'],
    transacting: req.trx
  })

  if(!expense) return res.status(404).respond({
    code: 404,
    message: 'Unable to load expense'
  })

  const access = await getUserAccess(req, req.user)

  const is_admin = _.includes(access.rights, 'finance:access_expense_reports')

  await res.status(200).respond(expense, (req, expense) => ({
    date: expense.get('date'),
    receipt_ids: expense.get('receipt_ids'),
    account_id: expense.get('account_id'),
    vendor_id: expense.get('vendor_id'),
    status: expense.get('status'),
    total: expense.get('total'),
    tax_total: expense.get('tax_total'),
    allocations: expense.related('allocations').map(allocation => {
      const is_owner_can_edit = allocation.get('user_id') === req.user.get('id') && _.includes(['incomplete','pending','rejected'], allocation.get('status'))
      const is_approver_can_edit = _.includes(allocation.get('approver_ids'), req.user.get('id')) && _.includes(['incomplete','pending','submitted','approved','rejected'], allocation.get('status'))
      return {
        id: allocation.get('id'),
        project_id: allocation.get('project_id'),
        expense_type_id: allocation.get('expense_type_id'),
        description: allocation.get('description'),
        amount: allocation.get('amount'),
        can_edit: is_admin || is_owner_can_edit || is_approver_can_edit,
        can_delete: allocation.get('id') !== expense.get('id') && _.includes(['incomplete','pending'], allocation.get('status'))
      }
    })
  }))

}

export default editRoute
