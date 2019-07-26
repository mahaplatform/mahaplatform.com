import Reimbursement from '../../../models/reimbursement'

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

  res.status(200).respond(reimbursement, (req, reimbursement) => ({
    date: reimbursement.get('date'),
    receipt_ids: reimbursement.get('receipt_ids'),
    vendor_id: reimbursement.get('vendor_id'),
    account_id: reimbursement.get('account_id'),
    line_items: reimbursement.related('line_items').map(line_item => ({
      id: line_item.get('id'),
      project_id: line_item.get('project_id'),
      expense_type_id: line_item.get('expense_type_id'),
      description: line_item.get('description'),
      amount: line_item.get('amount')
    }))
  }))

}

export default editRoute
