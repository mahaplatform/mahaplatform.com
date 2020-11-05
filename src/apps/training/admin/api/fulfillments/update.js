import FulfillmentSerializer from '../../../serializers/fulfillment_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Fulfillment from '../../../models/fulfillment'

const updateRoute = async (req, res) => {

  const fulfillment = await Fulfillment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['offering','training','user'],
    transacting: req.trx
  })

  if(!fulfillment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load fulfillment'
  })

  await fulfillment.save({
    offering_id: req.body.offering_id
  }, {
    patch: true,
    transacting: req.trx
  })

  // await audit(req, {
  //   story: 'regstration changed',
  //   auditable: fulfillment
  // })

  await socket.refresh(req, [
    `/admin/training/offerings/${fulfillment.get('offering_id')}`,
    `/admin/training/offerings/${req.body.offering_id}`,
    `/admin/training/fulfillments/${fulfillment.get('id')}`
  ])

  res.status(200).respond(fulfillment, FulfillmentSerializer)

}

export default updateRoute
