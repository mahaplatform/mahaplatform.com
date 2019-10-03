import formatObjectForTransport from '../../../core/utils/format_object_for_transport'
import { sendNotificationEmail } from '../services/notification_email'
import { getPresence } from '../../../core/services/presence'
import { messaging } from '../../../core/services/firebase'
import socket from '../../../core/services/emitter'
import knex from '../../../core/services/knex'
import Session from '../models/session'
import moment from 'moment'

export const sendNotification = async (user, notification, trx) => {

  const instructions = await getNotificationInstructions(user, trx)

  await deliverNotifications(user, instructions, notification, trx)

}

const getNotificationInstructions = async (user, trx) => {

  const sessions = await Session.query(qb => {
    qb.where('user_id', user.get('id'))
    qb.whereRaw('last_active_at > ?', moment().subtract(2, 'weeks'))
    qb.orderBy('last_active_at')
  }).fetchAll({
    transacting: trx,
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

const deliverNotifications = async (user, instructions, notification, trx) => {

  if(instructions.socket.length > 0) {

    await Promise.map(instructions.socket, async (session) => {

      await sendViaSocket(session, notification, trx)

    })

  }

  if(instructions.firebase.length > 0) {

    await Promise.map(instructions.firebase, async (session) => {

      await sendViaFirebase(session, session.related('device'), notification, trx)

    })

  }

  if(instructions.total === 0 && user.get('email_notifications_method') === 'ondemand') {

    return await sendViaEmail(user, notification, trx)

  }

  if(user.get('email_notifications_method') === 'digest') return

  if(notification.id) await markNotificationAsDelivered(user, notification, trx)

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

const sendViaSocket = async (session, notification, trx) => {

  await socket.in(`/admin/sessions/${session.get('id')}`).emit('message', {
    action: 'add_notification',
    data: formatObjectForTransport(notification)
  })

}

export const sendViaFirebase = async (session, device, notification, trx) => {

  const { title, body, route, code } = notification

  const sound = `${session.get('notification_sound')}.mp3`

  try {

    await messaging.send({
      data: route ? { title, body, code, route } : { title, body, code },
      token: device.get('push_token'),
      ...device.related('platform_type').get('text') === 'cordova' ? {
        notification: { title, body },
        android: {
          notification: {
            sound
          }
        },
        apns: {
          payload: {
            aps: { sound }
          }
        }
      } : {}
    })

  } catch(err) {

    if(err.errorInfo.code !== 'messaging/registration-token-not-registered') return

    await disablePush(session, device, trx)

  }

}

const sendViaEmail = async (user, notification, trx) => {

  await sendNotificationEmail(user, [
    {
      title: notification.title,
      body: notification.body,
      route: notification.route,
      user: notification.user,
      created_at: notification.created_at
    }
  ])

}

const markNotificationAsDelivered = async (user, notification, trx) => {

  await knex('maha_notifications').transacting(trx).where({
    id: notification.id
  }).update({
    is_delivered: true
  })

}

const disablePush = async (session, device, trx) => {

  await session.save({
    push_notifications_enabled: false
  }, { patch: true, transacting: trx })

  await device.save({
    push_token: null
  }, { patch: true, transacting: trx })

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
