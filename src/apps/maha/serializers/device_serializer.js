const DeviceSerializer = (req, device) => ({
  browser: device.related('browser_name').get('text'),
  device: device.related('device_type').get('text'),
  id: device.get('id'),
  os: device.related('os_name').get('text'),
  platform: device.related('platform_type').get('text'),
  push_enabled: device.get('push_enabled'),
  icon: device.get('icon'),
  display_name: device.get('display_name')
})

export default DeviceSerializer
