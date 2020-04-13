const sessionSerializer = (req, result) => ({
  id: result.get('id'),
  user: user(result.related('user')),
  device: device(result.related('device')),
  last_active_at: result.get('last_active_at')
})

const user = (user) => ({
  id: user.get('id'),
  initials: user.get('initials'),
  full_name: user.get('full_name'),
  photo: user.related('photo').get('path')
})

const device = (device) => ({
  id: device.get('id'),
  device_type: device.related('device_type').get('text'),
  os_name: device.related('os_name').get('text'),
  os_version: device.related('os_version').get('text'),
  browser_name: device.related('browser_name').get('text'),
  browser_version: device.related('browser_version').get('text'),
  is_push_enabled: device.get('push_enabled')
})


export default sessionSerializer
