import { messaging } from '../../../core/services/firebase'
import { BackframeError, Route } from '../../../server'
import Device from '../../../models/device'

const processor = async (req, trx, options) => {

  try {

    const device = await Device.where({
      fingerprint: req.params.fingerprint
    }).fetch({
      transacting: trx,
      withRelated: ['platform_type']
    })

    const token = device.get('push_token')

    const message = (device.related('platform_type').get('text') !== 'cordova') ? {
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
    }

    const result = await messaging.send({
      ...message,
      token
    })

    return result

  } catch(err) {

    console.log(err)

    throw new BackframeError({
      code: 422,
      message: 'Unable to push message'
    })

  }

}

const pushRoute = new Route({
  method: 'post',
  path: '/:fingerprint/push',
  processor
})

export default pushRoute
