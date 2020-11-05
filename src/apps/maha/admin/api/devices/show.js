import Device from '@apps/maha/models/device'

const showRoute = async (req, res) => {

  const device = await Device.where({
    fingerprint: req.params.fingerprint
  }).fetch({
    withRelated: ['platform_type','device_type','os_name','browser_name'],
    transacting: req.trx
  })

  res.status(200).respond({
    browser: device.related('browser_name').get('text'),
    device: device.related('device_type').get('text'),
    id: device.get('id'),
    os: device.related('os_name').get('text'),
    platform: device.related('platform_type').get('text'),
    push_enabled: device.get('push_enabled')
  })

}

export default showRoute
