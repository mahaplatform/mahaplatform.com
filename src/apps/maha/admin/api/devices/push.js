import { messaging } from '@core/services/firebase'
import Device from '@apps/maha/models/device'

const pushRoute = async (req, res) => {

  const device = await Device.where({
    fingerprint: req.params.fingerprint
  }).fetch({
    transacting: req.trx,
    withRelated: ['platform_type']
  })

  const result = await messaging.send({
    ...(device.related('platform_type').get('text') !== 'cordova') ? {
      data: {
        title: req.body.title,
        body: req.body.body,
        route: req.body.route || ''
      }
    } : {
      notification: {
        title: req.body.title,
        body: req.body.body
      },
      data: {
        route: req.body.route || ''
      }
    },
    token: device.get('push_token')
  })

  res.status(200).respond(result)

}

export default pushRoute
