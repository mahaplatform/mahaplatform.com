import Reimbursement from '../../../models/reimbursement'

const editRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts','user','project','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  res.status(200).respond(reimbursement, {
    fields: [
      'id',
      'date',
      'description',
      'amount',
      'receipt_ids',
      'project_id',
      'expense_type_id',
      'vendor_id'
    ]
  })

}

export default editRoute
