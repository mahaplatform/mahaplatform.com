import getUserAccess from '../../../../../core/utils/get_user_access'
import Check from '../../../models/check'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const check = await Check.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','line_items.project.members'],
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  const access = await getUserAccess(req, req.user)

  const is_admin = _.includes(access.rights, 'expenses:access_reports')

  res.status(200).respond(check, (req, check) => ({
    date_needed: check.get('date_needed'),
    vendor_id: check.get('vendor_id'),
    delivery_method: check.get('delivery_method'),
    invoice_number: check.get('invoice_number'),
    account_number: check.get('account_number'),
    receipt_ids: check.get('receipt_ids'),
    status: check.get('status'),
    total: check.get('total'),
    tax_total: check.get('tax_total'),
    line_items: check.related('line_items').map(line_item => {
      const is_owner_can_edit = line_item.get('owner_id') === req.user.get('id') && _.includes(['incomplete','pending','rejected'], line_item.get('status'))
      const is_approver_can_edit = _.includes(line_item.get('approver_ids'), req.user.get('id')) && _.includes(['incomplete','pending','submitted','approved','rejected'], line_item.get('status'))
      return {
        id: line_item.get('id'),
        project_id: line_item.get('project_id'),
        expense_type_id: line_item.get('expense_type_id'),
        description: line_item.get('description'),
        amount: line_item.get('amount'),
        can_edit: is_admin || is_owner_can_edit || is_approver_can_edit,
        can_delete: line_item.get('id') !== check.get('id') && _.includes(['incomplete','pending'], line_item.get('status'))
      }
    })
  }))


}

export default editRoute
