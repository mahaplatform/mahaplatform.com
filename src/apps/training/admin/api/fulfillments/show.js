import FulfillmentSerializer from '../../../serializers/fulfillment_serializer'
import Fulfillment from '../../../models/fulfillment'

const showRoute = async (req, res) => {

  const fulfillment = await Fulfillment.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['offering','training','user'],
    transacting: req.trx
  })

  if(!fulfillment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load fulfillment'
  })

  res.status(200).respond(fulfillment, FulfillmentSerializer)

}

export default showRoute
