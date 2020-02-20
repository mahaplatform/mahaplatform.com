import DisbursementSerializer from '../../../serializers/disbursement_serializer'
import Disbursement from '../../../models/disbursement'

const listRoute = async (req, res) => {

  const disbursements = await Disbursement.filterFetch({
    scope: (qb) => {
      qb.innerJoin('finance_merchants', 'finance_merchants.id', 'finance_disbursements.merchant_id')
      qb.where('finance_disbursements.team_id', req.team.get('id'))
    },
    aliases: {
      merchant: 'finance_merchants.title'
    },
    filter: {
      params: req.query.$filter,
      allowed: ['merchant_id','date']
    },
    sort: {
      soparamsrt: req.query.$sort,
      defaults: ['-created_at'],
      allowed: ['id','date','merchant','created_at']
    },
    page: req.query.$page,
    withRelated: ['merchant','payments'],
    transacting: req.trx
  })

  res.status(200).respond(disbursements, DisbursementSerializer)

}

export default listRoute
