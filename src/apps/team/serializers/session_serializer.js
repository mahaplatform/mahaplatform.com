const sessionSerializer = (req, result) => ({
  id: result.get('id'),
  user: {
    id: result.related('user').get('id'),
    initials: result.related('user').get('initials'),
    full_name: result.related('user').get('full_name'),
    photo: result.related('user').related('photo').get('path')
  },
  device: {
    id: result.related('device').get('id'),
    device_type: result.related('device').related('device_type').get('text'),
    os_name: result.related('device').related('os_name').get('text'),
    os_version: result.related('device').related('os_version').get('text'),
    browser_name: result.related('device').related('browser_name').get('text'),
    browser_version: result.related('device').related('browser_version').get('text'),
    is_push_enabled: result.get('push_enabled')
  },
  last_active_at: result.get('last_active_at')
})


export default sessionSerializer
