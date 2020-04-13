import DisbursementSerializer from '../../../serializers/disbursement_serializer'
import Disbursement from '../../../models/disbursement'

const listRoute = async (req, res) => {

  const disbursements = await Disbursement.filterFetch({
    scope: (qb) => {
      qb.select('finance_disbursements.*','finance_disbursement_totals.*')
      qb.innerJoin('finance_disbursement_totals', 'finance_disbursement_totals.disbursement_id', 'finance_disbursements.id')
      qb.innerJoin('finance_merchants', 'finance_merchants.id', 'finance_disbursements.merchant_id')
      qb.where('finance_disbursements.team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['merchant_id','date']
    },
    aliases: {
      merchant: 'finance_merchants.title'
    },
    sort: {
      sort: req.query.$sort,
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
