import FulfillmentSerializer from '../../../../serializers/fulfillment_serializer'
import Fulfillment from '../../../../models/fulfillment'

const fulfillmentsRoute = async (req, res) => {

  const fulfillments = await Fulfillment.scope({
    team: req.team
  }).query(qb => {
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(fulfillments, FulfillmentSerializer)

}

export default fulfillmentsRoute
