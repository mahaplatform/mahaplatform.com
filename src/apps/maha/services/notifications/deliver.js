import formatObjectForTransport from '../../../../core/utils/format_object_for_transport'
import { sendNotificationEmail } from '../../services/notification_email'
import { messaging } from '../../../../core/services/firebase'
import socket from '../../../../core/services/emitter'
import knex from '../../../../core/services/knex'

const deliver = async (req, { user, instructions, notification }) => {

  if(instructions.socket.length > 0) {
    await Promise.map(instructions.socket, async (session) => {
      await sendViaSocket(req, {
        session,
        notification
      })
    })
  }

  if(instructions.firebase.length > 0) {
    await Promise.map(instructions.firebase, async (session) => {
      await sendViaFirebase(req, {
        session,
        device: session.related('device'),
        notification
      })
    })
  }

  if(instructions.total === 0 && user.get('email_notifications_method') === 'ondemand') {
    return await sendViaEmail(req, {
      user,
      notification
    })
  }

  if(user.get('email_notifications_method') === 'digest') return

  if(!notification.id) return

  await markNotificationAsDelivered(req, {
    user,
    notification
  })

}

const sendViaSocket = async (req, { session, notification }) => {
  await socket.in(`/admin/sessions/${session.get('id')}`).emit('message', {
    action: 'add_notification',
    data: formatObjectForTransport(notification)
  })
}

export const sendViaFirebase = async (req, { session, device, notification }) => {
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
    await disablePush(req, {
      session,
      device
    })
  }
}

const sendViaEmail = async (req, { user, notification }) => {
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

const markNotificationAsDelivered = async (req, { user, notification }) => {
  await knex('maha_notifications').transacting(req.trx).where({
    id: notification.id
  }).update({
    is_delivered: true
  })
}

const disablePush = async (req, { device }) => {
  await device.save({
    push_token: null
  }, {
    patch: true,
    transacting: req.trx
  })
}

export default deliver
