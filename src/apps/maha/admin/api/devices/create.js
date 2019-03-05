import { createDevice } from '../../../services/device'
import { Route } from '../../../server'

const processor = async (req, trx, options) => {

  const device = await createDevice(req, trx)

  await device.load(['platform_type','device_type','os_name','browser_name'], {
    transacting: trx
  })

  return {
    browser: device.related('browser_name').get('text'),
    device: device.related('device_type').get('text'),
    id: device.get('id'),
    os: device.related('os_name').get('text'),
    platform: device.related('platform_type').get('text'),
    push_enabled: device.get('push_enabled'),
    icon: device.get('icon'),
    display_name: device.get('display_name')
  }

}

const createRoute = new Route({
  authenticated: false,
  method: 'post',
  path: '',
  processor
})

export default createRoute
