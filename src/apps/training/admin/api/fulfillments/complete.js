import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Fulfillment from '../../../models/fulfillment'
import moment from 'moment'

const completeRoute = async (req, res) => {

  const fulfillment = await Fulfillment.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!fulfillment) return res.status(404).respond({
    code: 404,
    message: 'Unable to load fulfillment'
  })

  await fulfillment.save({
    ...whitelist(req.body, ['feedback']),
    completed_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await audit(req, {
    story: 'completed',
    auditable: fulfillment
  })

  // await activity(req, {
  //   story: 'registered for {object}',
  //   object: category
  // })

  await socket.refresh(req, [
    `/admin/training/offerings/${fulfillment.get('offering_id')}`,
    `/admin/training/offerings/${req.body.offering_id}`,
    `/admin/training/fulfillments/${fulfillment.get('id')}`
  ])

  res.status(200).respond(true)

}

export default completeRoute
