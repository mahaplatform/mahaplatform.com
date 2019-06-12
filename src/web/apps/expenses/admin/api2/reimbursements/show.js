import ReimbursementSerializer from '../../../serializers/reimbursement_serializer'
import Reimbursement from '../../../models/reimbursement'

const showRoute = async (req, res) => {

  const reimbursement = await Reimbursement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user','project.members','expense_type','status','vendor'],
    transacting: req.trx
  })

  if(!reimbursement) return req.status(404).respond({
    code: 404,
    message: 'Unable to load reimbursement'
  })

  res.status(200).respond(reimbursement, (reimbursement) => {
    return ReimbursementSerializer(req, req.trx, reimbursement)
  })

}

export default showRoute
