import { getPresence } from '@core/services/presence'
import Session from '@apps/maha/models/session'
import moment from 'moment'

const getInstructions = async (req, { account, user }) => {

  const sessions = await Session.query(qb => {
    qb.where('user_id', user.get('id'))
    qb.whereRaw('last_active_at > ?', moment().subtract(2, 'weeks'))
    qb.orderBy('last_active_at')
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['device.platform_type']
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

  const is_muted = getMuted(req, {
    account
  })

  return await Promise.reduce(sessions_with_activity, async (results, session) => {
    const strategy = getNotificationStrategy({ account, user, session, is_muted })
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

const getNotificationStrategy = ({ account, user, session, muted }) => {

  if(muted) return 'email'

  const preferences = account.get('preferences')

  const device = session.related('device')

  const platform = device.related('platform_type').get('text')

  // is the session signed in?
  if(!session.get('is_active')) return 'email'

  // is this active or absent desktop device
  if(platform !== 'cordova' && session.status !== null) return 'socket'

  // is this and active mobile session
  if(platform === 'cordova' && session.status === 'active') return 'socket'

  // is push enabled for this user?
  if(device.get('push_token') && preferences.push_notifications_enabled) return 'firebase'

  return 'email'

}

const getMuted = (req, { account }) => {
  const preferences = account.get('preferences')
  const now = moment()
  const is_weekend = now.format('e') % 6 === 0
  if(preferences.mute_weekends && is_weekend) return true
  if(!preferences.mute_evenings) return false
  const start = moment(preferences.mute_evenings_start_time, 'HH:mm:ss')
  const end = moment(preferences.mute_evenings_end_time, 'HH:mm:ss')
  const adjusted = (start.diff(end) > 0) ? end.add(1, 'day') : end
  return now.diff(start) > 0 && now.diff(adjusted) < 0
}

export default getInstructions
