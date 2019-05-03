import Device from '../../../models/device'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const device = await Device.where({
    fingerprint: req.params.fingerprint
  }).fetch({
    withRelated: ['platform_type','device_type','os_name','browser_name'],
    transacting: trx
  })

  return {
    browser: device.related('browser_name').get('text'),
    device: device.related('device_type').get('text'),
    id: device.get('id'),
    os: device.related('os_name').get('text'),
    platform: device.related('platform_type').get('text'),
    push_enabled: device.get('push_enabled')
  }

}

const showRoute = new Route({
  method: 'get',
  path: '/:fingerprint',
  processor
})

export default showRoute
