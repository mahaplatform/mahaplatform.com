import CustomerSerializer from '@apps/finance/serializers/customer_serializer'
import Customer from '@apps/finance/models/customer'

const showRoute = async (req, res) => {

  const customer = await Customer.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  await res.status(200).respond(customer, CustomerSerializer)

}

export default showRoute
