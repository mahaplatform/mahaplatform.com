import DisbursementSerializer from '../../../serializers/disbursement_serializer'
import Disbursement from '../../../models/disbursement'

const listRoute = async (req, res) => {

  const disbursements = await Disbursement.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filterParams: ['merchant_id'],
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','created_at']
  }).fetchPage({
    withRelated: ['merchant','payments'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(disbursements, DisbursementSerializer)

}

export default listRoute
