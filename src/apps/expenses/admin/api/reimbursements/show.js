import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import Reimbursement from '../../../models/reimbursement'

const showRoute = async (req, res) => {

  const reimbursement = await Reimbursement.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset.source','user','project.members','expense_type','line_items.project','line_items.expense_type','status','vendor','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  res.status(200).respond(reimbursement, ReimbursementSerializer)

}

export default showRoute
