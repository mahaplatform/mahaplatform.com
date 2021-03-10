import Session from '@apps/maha/models/session'

const listRoute = async (req, res) => {

  const sessions = await Session.query(qb => {
    qb.innerJoin('maha_devices', 'maha_devices.id', 'maha_sessions.device_id')
    qb.where('maha_sessions.user_id', req.user.get('id'))
    qb.orderBy('maha_sessions.last_active_at', 'desc')
  }).fetchAll({
    withRelated: ['device.platform_type','device.display_name'],
    transacting: req.trx
  })

  await res.status(200).respond(sessions.map(session => ({
    session_id: session.get('id'),
    id: session.related('device').get('id'),
    device: session.related('device').related('device_type').get('text'),
    platform: session.related('device').related('platform_type').get('text'),
    display_name: session.related('device').related('display_name').get('text'),
    fingerprint: session.related('device').get('fingerprint'),
    push_enabled: session.related('device').get('push_enabled'),
    last_active_at: session.get('last_active_at'),
    icon: session.related('device').get('icon')
  })))

}

export default listRoute
