import CardSerializer from '../../../serializers/card_serializer'
import Customer from '../../../models/customer'
import Card from '../../../models/card'

const cardsRoute = async (req, res) => {

  const customer = await Customer.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.customer_id)
  }).fetch({
    transacting: req.trx
  })

  if(!customer) return res.status(404).respond({
    code: 404,
    message: 'Unable to load customer'
  })

  const cards = await Card.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('customer_id', customer.get('id'))
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(cards, CardSerializer)

}

export default cardsRoute
