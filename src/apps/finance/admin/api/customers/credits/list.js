import CreditSerializer from '@apps/finance/serializers/credit_serializer'
import Customer from '@apps/finance/models/customer'
import Credit from '@apps/finance/models/credit'

const listRoute = async (req, res) => {

  const customer = await Customer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const credits = await Credit.filterFetch({
    scope: (qb) => {
      qb.select('finance_credits.*','finance_credit_details.*')
      qb.innerJoin('finance_credit_details','finance_credit_details.credit_id','finance_credits.id')
      qb.where('team_id', req.team.get('id'))
      qb.where('customer_id', customer.get('id'))
    },
    aliases: {
      applied: 'finance_credit_details.applied',
      balance: 'finance_credit_details.balance'
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at'
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(credits, CreditSerializer)

}

export default listRoute
