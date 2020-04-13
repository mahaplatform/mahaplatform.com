import { getPresence } from '../../../../core/services/presence'
import Session from '../../models/session'
import moment from 'moment'

const getInstructions = async (req, { user }) => {

  const sessions = await Session.query(qb => {
    qb.where('user_id', user.get('id'))
    qb.whereRaw('last_active_at > ?', moment().subtract(2, 'weeks'))
    qb.orderBy('last_active_at')
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['device.device_type','device.platform_type','device.browser_name']
  })

  const presences = await Promise.reduce(await getPresence(), async (presences, presence) => ({
    ...presences,
    [presence.session_id]: presence
  }), {})

  const sessions_with_activity = sessions.toArray().map(session => {
    const presence = presences[session.get('id')]
    session.status = presence ? presence.status : null
    session.last_active_at = presence ? presence.last_active_at : session.get('last_active_at')
    return session
  })

  const is_muted = getMuted(user)

  return await Promise.reduce(sessions_with_activity, async (results, session) => {
    const strategy = getNotificationStrategy(user, session, is_muted)
    return {
      ...results,
      [strategy]: [
        ...results[strategy],
        session
      ],
      total: results.total + (strategy !== 'email' ? 1 : 0)
    }
  }, { socket: [], firebase: [], email: [], total: 0 })

}

const getNotificationStrategy = (user, session, muted) => {

  if(muted) return 'email'

  const device = session.related('device')

  const platform = device.related('platform_type').get('text')

  // is the session signed in?
  if(!session.get('is_active')) return 'email'

  // is this active or absent desktop device
  if(platform !== 'cordova' && session.status !== null) return 'socket'

  // is this and active mobile session
  if(platform === 'cordova' && session.status === 'active') return 'socket'

  // is there an active token for this device?
  if(!device.get('push_token')) return 'email'

  // is push enabled for this user?
  if(user.get('push_notifications_enabled')) return 'firebase'

  return 'email'

}

const getMuted = (user) => {
  const now = moment()
  const is_weekend = now.format('e') % 6 === 0
  if(user.get('mute_weekends') && is_weekend) return true
  if(!user.get('mute_evenings')) return false
  const start = moment(user.get('mute_evenings_start_time'), 'HH:mm:ss')
  const end = moment(user.get('mute_evenings_end_time'), 'HH:mm:ss')
  const adjusted = (start.diff(end) > 0) ? end.add(1, 'day') : end
  return now.diff(start) > 0 && now.diff(adjusted) < 0
}

export default getInstructions
