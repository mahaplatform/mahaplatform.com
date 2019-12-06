import CustomerSerializer from '../../../serializers/customer_serializer'
import Customer from '../../../models/customer'

const showRoute = async (req, res) => {

  const customer = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  res.status(200).respond(customer, CustomerSerializer)

}

export default showRoute
