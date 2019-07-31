import getUserAccess from '../../../../../core/utils/get_user_access'
import Reimbursement from '../../../models/reimbursement'
import _ from 'lodash'

const editRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','line_items'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  const access = await getUserAccess(req, req.user)

  res.status(200).respond(reimbursement, (req, reimbursement) => ({
    date: reimbursement.get('date'),
    receipt_ids: reimbursement.get('receipt_ids'),
    vendor_id: reimbursement.get('vendor_id'),
    total: reimbursement.get('total'),
    line_items: reimbursement.related('line_items').map(line_item => ({
      id: line_item.get('id'),
      project_id: line_item.get('project_id'),
      expense_type_id: line_item.get('expense_type_id'),
      description: line_item.get('description'),
      amount: line_item.get('amount'),
      can_edit: _.includes([1,2,5], line_item.get('status_id')) || _.includes(access.rights, 'expenses:access_reports'),
      can_delete: line_item.get('id') !== reimbursement.get('id') && (_.includes([1,2,5], line_item.get('status_id')) || _.includes(access.rights, 'expenses:access_reports'))
    }))
  }))

}

export default editRoute
