import sessionSerializer from '../../../serializers/session_serializer'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import { createSession } from '../../../services/sessions'
import Session from '../../../models/session'
import Device from '../../../models/device'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options)  => {

  req.device = await Device.where({
    fingerprint: req.headers.fingerprint
  }).fetch({
    transacting: trx ,
    withRelated: ['platform_type','display_name']
  })

  req.session = await _findOrCreateSession(req, trx)

  req.session.save({
    is_active: true
  }, { patch: true, transacting: trx })

  req.token = createUserToken(req.user, 'user_id', {
    session_id: req.session.get('id')
  })

  req.sessions = await Session.query(qb => {
    qb.innerJoin('maha_devices', 'maha_devices.id', 'maha_sessions.device_id')
    qb.where('maha_sessions.user_id', req.user.get('id'))
    qb.orderBy('maha_sessions.last_active_at', 'desc')
  }).fetchAll({
    withRelated: ['device.platform_type','device.display_name'],
    transacting: trx
  })

  return await sessionSerializer(req, trx, options)

}

const _findOrCreateSession = async (req, trx) => {

  const session = await Session.where({
    device_id: req.device.get('id'),
    user_id: req.user.get('id')
  }).fetch({ transacting: trx })

  if(session) return session

  return await createSession(req, trx)

}

const sessionRoute = new Route({
  method: 'get',
  path: '/session',
  processor
})

export default sessionRoute
