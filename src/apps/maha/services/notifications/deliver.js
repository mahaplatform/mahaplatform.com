import formatObjectForTransport from '@core/utils/format_object_for_transport'
import { messaging } from '@core/vendor/firebase'
import { sendNotificationEmail } from './email'
import socket from '@core/vendor/emitter'
import _ from 'lodash'

const serialize = (req, { notification, preferences, team }) => ({
  title: team.get('title'),
  image: team.related('logo').get('path'),
  body: notification.body,
  code: _.random(Math.pow(36, 9), Math.pow(36, 10) - 1).toString(36),
  sound: preferences.notification_sound_enabled ? preferences.notification_sound : null,
  subject: notification.subject,
  route: `/${team.get('subdomain')}${notification.route}`
})

const deliver = async (req, params) => {

  const { account, instructions, team, user } = params

  const { signin, strategy } = instructions

  const notification = serialize(req, {
    notification: params.notification,
    preferences: account.get('preferences'),
    team
  })

  if(strategy === 'socket') {
    await sendViaSocket(req, {
      account,
      notification,
      signin
    })
  }

  if(strategy === 'firebase') {
    await sendViaFirebase(req, {
      account,
      notification,
      signin,
      team,
      user
    })
  }

  if(strategy === 'email') {
    await sendViaEmail(req, {
      account,
      notification,
      team,
      user
    })
  }

  if(notification.id) {
    await req.trx('maha_notifications').where({
      id: notification.id
    }).update({
      is_delivered: true
    })
  }

}

const sendViaSocket = async (req, { account, notification }) => {
  await socket.in(`/admin/accounts/${account.get('id')}`).emit('message', {
    action: 'add_notification',
    data: formatObjectForTransport({
      ...notification,
      body: `${notification.subject.full_name} ${notification.body}`
    })
  })
}

export const sendViaFirebase = async (req, { account, notification, signin, team, user }) => {
  const device = signin.related('device')
  const { title, code, route, sound } = notification
  const body =`${notification.subject.full_name} ${notification.body}`
  const platform = device.related('platform_type').get('text')
  try {
    await messaging.send({
      data: { title, body, code, data: JSON.stringify({ route, sound }) },
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
    console.log(err)
    if(err.errorInfo && err.errorInfo.code !== 'messaging/registration-token-not-registered') return
    await disablePush(req, {
      signin,
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
