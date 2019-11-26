import DisbursementSerializer from '../../../serializers/disbursement_serializer'
import Disbursement from '../../../models/disbursement'

const listRoute = async (req, res) => {

  const disbursements = await Disbursement.scope(qb => {
    qb.innerJoin('finance_merchants', 'finance_merchants.id', 'finance_disbursements.merchant_id')
    qb.where('finance_disbursements.team_id', req.team.get('id'))
  }).filter({
    filterParams: ['merchant_id','date'],
    filter: req.query.$filter
  }).sort({
    aliases: {
      merchant: 'finance_merchants.title'
    },
    sort: req.query.$sort,
    defaultSort: ['-created_at'],
    sortParams: ['id','date','merchant','created_at']
  }).fetchPage({
    withRelated: ['merchant','payments'],
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(disbursements, DisbursementSerializer)

}

export default listRoute
