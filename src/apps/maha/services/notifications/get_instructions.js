import { getPresence } from '@core/services/presence'
import Signin from '@apps/maha/models/signin'
import moment from 'moment'

const getInstructions = async (req, { account, user }) => {

  const signins = await Signin.query(qb => {
    qb.where('account_id', account.get('id'))
    qb.whereRaw('last_active_at > ?', moment().subtract(2, 'weeks'))
    qb.orderBy('last_active_at')
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['device.platform_type']
  })

  const presences = await Promise.reduce(await getPresence(), async (presences, presence) => ({
    ...presences,
    [presence.signin_id]: presence
  }), {})

  const signins_with_activity = signins.toArray().map(signin => {
    const presence = presences[signin.get('id')]
    signin.status = presence ? presence.status : null
    signin.last_active_at = presence ? presence.last_active_at : signin.get('last_active_at')
    return signin
  })

  const is_muted = getMuted(req, {
    account
  })

  return await Promise.reduce(signins_with_activity, async (results, signin) => {
    const strategy = getNotificationStrategy({ account, user, signin, is_muted })
    return {
      ...results,
      [strategy]: [
        ...results[strategy],
        signin
      ],
      total: results.total + (strategy !== 'email' ? 1 : 0)
    }
  }, { socket: [], firebase: [], email: [], total: 0 })

}

const getNotificationStrategy = ({ account, user, signin, muted }) => {

  if(muted) return 'email'

  const preferences = account.get('preferences')

  const device = signin.related('device')

  const platform = device.related('platform_type').get('text')

  // is the signin signed in?
  if(!signin.get('is_active')) return 'email'

  // is this active or absent desktop device
  if(platform !== 'cordova' && signin.status !== null) return 'socket'

  // is this and active mobile signin
  if(platform === 'cordova' && signin.status === 'active') return 'socket'

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
