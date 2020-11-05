import CreditSerializer from '@apps/finance/serializers/credit_serializer'
import Credit from '@apps/finance/models/credit'

const showRoute = async (req, res) => {

  const credit = await Credit.query(qb => {
    qb.select('finance_credits.*','finance_credit_details.*')
    qb.innerJoin('finance_credit_details','finance_credit_details.credit_id','finance_credits.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', req.params.customer_id)
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['customer','program'],
    transacting: req.trx
  })

  if(!credit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load credit'
  })

  res.status(200).respond(credit, CreditSerializer)

}

export default showRoute
