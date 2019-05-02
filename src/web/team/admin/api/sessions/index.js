import { Resources, Session } from 'maha'

const defaultQuery = (req, trx, qb, options) => {

  qb.joinRaw('inner join maha_users on maha_users.id=maha_sessions.user_id')

  qb.joinRaw('inner join maha_devices on maha_devices.id=maha_sessions.device_id')

  qb.joinRaw('inner join maha_device_values device_types on device_types.id=maha_devices.device_type_id')

  qb.joinRaw('inner join maha_device_values os_names on os_names.id=maha_devices.os_name_id')

  qb.joinRaw('inner join maha_device_values browser_names on browser_names.id=maha_devices.browser_name_id')

}

const SessionSerializer = (req, trx, result) => ({
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
    os_version: result.related('os_version').get('text'),
    browser_name: result.related('device').related('browser_name').get('text'),
    browser_version: result.related('browser_version').get('text'),
    is_push_enabled: result.get('is_push_enabled')
  },
  last_active_at: result.get('last_active_at')
})

const sessionResources = new Resources({
  defaultQuery,
  filterParams: ['maha_devices.device_type_id','maha_devices.os_name_id','maha_devices.browser_name_id','user_id'],
  model: Session,
  only: ['list'],
  path: '/sessions',
  serializer: SessionSerializer,
  sortParams: ['last_active_at','device_types.text','os_names.text','browser_names.text'],
  withRelated: ['device.device_type','device.os_name','device.os_version','device.browser_name','device.browser_version','user.photo']
})

export default sessionResources
