import FulfillmentSerializer from '../../../serializers/fulfillment_serializer'
import { whitelist } from '../../../../../web/core/services/routes/params'
import socket from '../../../../../web/core/services/routes/emitter'
import Fulfillment from '../../../models/fulfillment'

const reviewRoute = async (req, res) => {

  const fulfillment = await Fulfillment.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!fulfillment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load fulfillment'
  })

  await fulfillment.save({
    ...whitelist(req.body, ['overall_rating','expectations_rating','knowledge_rating','presentation_rating','content_rating','additional_feedback'])
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

export default reviewRoute
