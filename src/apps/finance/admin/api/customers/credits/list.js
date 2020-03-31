import CreditSerializer from '../../../../serializers/credit_serializer'
import Customer from '../../../../models/customer'
import Credit from '../../../../models/credit'

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
      qb.where('team_id', req.team.get('id'))
      qb.where('customer_id', customer.get('id'))
    },
    page: req.query.$page,
    withRelated: ['program'],
    transacting: req.trx
  })

  res.status(200).respond(credits, CreditSerializer)

}

export default listRoute
