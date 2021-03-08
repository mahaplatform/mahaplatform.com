import { getPresence } from '@core/services/presence'
import Signin from '@apps/maha/models/signin'
import moment from 'moment'

const getInstructions = async (req, { account, user }) => {

  const preferences = account.get('preferences')

  const presences = await getPresence().then(presenses => {
    return presenses.reduce((presences, presence) => ({
      ...presences,
      [presence.signin_id]: presence
    }), {})
  })

  const signins = await Signin.query(qb => {
    qb.where('account_id', account.get('id'))
    qb.whereRaw('last_active_at > ?', moment().subtract(2, 'weeks'))
    qb.orderBy('last_active_at', 'desc')
  }).fetchAll({
    transacting: req.trx,
    withRelated: ['device.platform_type']
  }).then(results => results.map(signin => {
    const presence = presences[signin.get('id')]
    signin.status = presence ? presence.status : null
    signin.last_active_at = presence ? presence.last_active_at : signin.get('last_active_at')
    signin.platform = signin.related('device').related('platform_type').get('text')
    signin.push_enabled = signin.related('device').get('push_enabled')
    return signin
  }))

  if(!preferences.notifications_enabled || isMuted(preferences)) return null

  const active = getActive(req, {
    preferences,
    signins
  })

  if(active) return active

  const absent = getAbsent(req, {
    preferences,
    signins
  })

  if(absent) return absent

  const cordova = getCordova(req, {
    preferences,
    signins
  })

  if(cordova) return cordova

  const browser = getBrowser(req, {
    preferences,
    signins
  })

  if(browser) return browser

  const ondemand = getOnDemand(req, {
    preferences,
    signins
  })

  if(ondemand) return ondemand

  return null

}

const getOnDemand = (req, { preferences, signins }) => {
  const { email_notifications_method } = preferences
  if(email_notifications_method !== 'ondemand') return null
  return {
    strategy: 'email'
  }
}

const getBrowser = (req, { preferences, signins }) => {
  const { push_notifications_enabled } = preferences
  if(!push_notifications_enabled) return null
  const browser = signins.find(signin => {
    return signin.platform === 'web' && signin.push_enabled
  })
  return browser ? {
    signin: browser,
    strategy: 'firebase'
  } : null
}

const getCordova = (req, { preferences, signins }) => {
  const { push_notifications_enabled } = preferences
  if(!push_notifications_enabled) return null
  const cordova = signins.find(signin => {
    return signin.platform === 'cordova' && signin.push_enabled
  })
  return cordova ? {
    signin: cordova,
    strategy: 'firebase'
  } : null
}

const getAbsent = (req, { preferences, signins }) => {
  const { push_notifications_enabled, in_app_notifications_enabled } = preferences
  if(!push_notifications_enabled && !in_app_notifications_enabled) return null
  const absent = signins.find(signin => {
    return signin.status === 'absent'
  })
  return absent ? {
    signin: absent,
    strategy: 'socket'
  } : null
}

const getActive = (req, { preferences, signins }) => {
  const { push_notifications_enabled, in_app_notifications_enabled } = preferences
  if(!push_notifications_enabled && !in_app_notifications_enabled) return null
  const active = signins.find(signin => {
    return signin.status === 'active'
  })
  return active ? {
    signin: active,
    strategy: 'socket'
  } : null
}

const isMuted = (preferences) => {
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
