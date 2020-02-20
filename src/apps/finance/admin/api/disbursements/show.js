import DisbursementSerializer from '../../../serializers/disbursement_serializer'
import Disbursement from '../../../models/disbursement'

const showRoute = async (req, res) => {

  const disbursement = await Disbursement.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['merchant','payments'],
    transacting: req.trx
  })

  if(!disbursement) return res.status(404).respond({
    code: 404,
    message: 'Unable to load disbursement'
  })

  res.status(200).respond(disbursement, DisbursementSerializer)

}

export default showRoute
