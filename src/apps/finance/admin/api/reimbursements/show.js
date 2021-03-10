import ReimbursementSerializer from '@apps/finance/serializers/reimbursement_serializer'
import Reimbursement from '@apps/finance/models/reimbursement'

const showRoute = async (req, res) => {

  const reimbursement = await Reimbursement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['receipts.asset','receipts.asset','user','project.members','expense_type','allocations.project','allocations.expense_type','vendor','audit.story','audit.user.photo'],
    transacting: req.trx
  })

  if(!reimbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  await res.status(200).respond(reimbursement, ReimbursementSerializer)

}

export default showRoute
