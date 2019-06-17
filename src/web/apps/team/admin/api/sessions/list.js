import SessionSerializer from '../../../serializers/session_serializer'
import Session from '../../../../maha/models/session'

const listRoute = async (req, res) => {

  const sessions = await Session.scope({
    team: req.team
  }).query(qb => {
    qb.joinRaw('inner join maha_users on maha_users.id=maha_sessions.user_id')
    qb.joinRaw('inner join maha_devices on maha_devices.id=maha_sessions.device_id')
    qb.joinRaw('inner join maha_device_values device_types on device_types.id=maha_devices.device_type_id')
    qb.joinRaw('inner join maha_device_values os_names on os_names.id=maha_devices.os_name_id')
    qb.joinRaw('inner join maha_device_values browser_names on browser_names.id=maha_devices.browser_name_id')
  }).filter({
    filter: req.query.$filter,
    filterParams: ['maha_devices.device_type_id','maha_devices.os_name_id','maha_devices.browser_name_id','user_id']
  }).sort({
    sort: req.query.$sort,
    sortParams: ['last_active_at','device_types.text','os_names.text','browser_names.text']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['device.device_type','device.os_name','device.os_version','device.browser_name','device.browser_version','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(sessions, SessionSerializer)

}

export default listRoute
