import formatObjectForTransport from '@core/utils/format_object_for_transport'
import { sendNotificationEmail } from './email'
import { messaging } from '@core/vendor/firebase'
import socket from '@core/vendor/emitter'
import _ from 'lodash'

const serialize = (req, { notification, preferences, team }) => ({
  title: team.get('title'),
  image: team.related('logo').get('path'),
  body: `${notification.subject.full_name} ${notification.body}`,
  code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
  sound: preferences.notification_sound_enabled ? preferences.notification_sound : null,
  subject: notification.subject,
  route: `${team.get('subdomain')}${notification.route}`
})

const deliver = async (req, params) => {

  const { account, instructions, team, user } = params

  const preferences = account.get('preferences')

  const notification = serialize(req, {
    notification: params.notification,
    preferences,
    team
  })

  console.log(notification)

  if(instructions.socket.length > 0) {
    await Promise.map(instructions.socket, async (session) => {
      await sendViaSocket(req, {
        account,
        notification
      })
    })
  }

  if(instructions.firebase.length > 0) {
    await Promise.map(instructions.firebase, async (session) => {
      await sendViaFirebase(req, {
        account,
        notification,
        session,
        team,
        user
      })
    })
  }

  if(instructions.total === 0 && preferences.email_notifications_method === 'ondemand') {
    return await sendViaEmail(req, {
      account,
      notification,
      team,
      user
    })
  }

  if(preferences.email_notifications_method === 'digest') return

  if(notification.id) {
    await req.trx('maha_notifications').where({
      id: notification.id
    }).update({
      is_delivered: true
    })
  }

}

const sendViaSocket = async (req, { account, notification }) => {
  await socket.in(`/admin/account/${account.get('id')}`).emit('message', {
    action: 'add_notification',
    data: formatObjectForTransport(notification)
  })
}

export const sendViaFirebase = async (req, { account, notification, session, team, user }) => {
  const device = session.related('device')
  const { title, body, code, route, sound } = notification
  const platform = device.related('platform_type').get('text')
  try {
    await messaging.send({
      data: { title, body, code, route, sound },
      token: device.get('push_token'),
      ...platform === 'cordova' ? {
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
    if(err.errorInfo && err.errorInfo.code !== 'messaging/registration-token-not-registered') return
    await disablePush(req, {
      session,
      device
    })
  }
}

const sendViaEmail = async (req, { account, notification, team, user }) => {
  await sendNotificationEmail(user, {
    digest: {
      account,
      teams: {
        [team.get('id')]: {
          team,
          subjects: {
            [notification.subject.id]: {
              subject: notification.subject,
              notifications: [
                notification
              ]
            }
          }
        }
      }
    }
  })
}

const disablePush = async (req, { device }) => {
  await device.save({
    push_token: null
  }, {
    transacting: req.trx,
    patch: true
  })
}

export default deliver
