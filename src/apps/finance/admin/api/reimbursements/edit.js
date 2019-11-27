import getUserAccess from '../../../../../core/utils/get_user_access'
import Reimbursement from '../../../models/reimbursement'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','allocations.project.members'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  const access = await getUserAccess(req, req.user)

  const is_admin = _.includes(access.rights, 'finance:access_reports')

  res.status(200).respond(reimbursement, (req, reimbursement) => ({
    date: reimbursement.get('date'),
    receipt_ids: reimbursement.get('receipt_ids'),
    vendor_id: reimbursement.get('vendor_id'),
    status: reimbursement.get('status'),
    total: reimbursement.get('total'),
    allocations: reimbursement.related('allocations').map(allocation => {
      const is_owner_can_edit = allocation.get('owner_id') === req.user.get('id') && _.includes(['incomplete','pending','rejected'], allocation.get('status'))
      const is_approver_can_edit = _.includes(allocation.get('approver_ids'), req.user.get('id')) && _.includes(['incomplete','pending','submitted','approved','rejected'], allocation.get('status'))
      return {
        id: allocation.get('id'),
        project_id: allocation.get('project_id'),
        expense_type_id: allocation.get('expense_type_id'),
        description: allocation.get('description'),
        amount: allocation.get('amount'),
        can_edit: is_admin || is_owner_can_edit || is_approver_can_edit,
        can_delete: allocation.get('id') !== reimbursement.get('id') && _.includes(['incomplete','pending'], allocation.get('status'))
      }
    })
  }))

}

export default editRoute
