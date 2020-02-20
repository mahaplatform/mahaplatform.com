import FulfillmentSerializer from '../../../../serializers/fulfillment_serializer'
import Fulfillment from '../../../../models/fulfillment'

const fulfillmentsRoute = async (req, res) => {

  const fulfillments = await Fulfillment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('offering_id', req.params.offering_id)
  }).fetchAll({
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(fulfillments, FulfillmentSerializer)

}

export default fulfillmentsRoute
