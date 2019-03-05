import NotificationSerializer from '../serializers/notification_serializer'
import { sendNotificationEmail } from '../services/notification_email'
import Notification from '../models/notification'
import socket from '../core/services/emitter'
import knex from '../core/services/knex'
import cron from '../core/objects/cron'
import moment from 'moment'
import _ from 'lodash'

export const processor = async (trx) => {

  const notifications = await Notification.query(qb => {

    qb.joinRaw('inner join "maha_users" on "maha_users"."id"="maha_notifications"."user_id" and "maha_users"."email_notifications_method"=?', 'digest')

    qb.whereRaw('maha_notifications.created_at < ?', moment().subtract(5, 'minutes'))

    qb.where('maha_notifications.is_delivered', false)

    qb.orderBy('created_at', 'desc')

  }).fetchAll({
    withRelated: ['app', 'object_owner', 'subject.photo', 'story', 'team', 'user'],
    transacting: trx
  }).then(result => result.toArray())

  const users = notifications.reduce((users, notification) => ({
    ...users,
    [notification.get('user_id')]: {
      user: notification.related('user'),
      notifications: [
        ..._.get(users, `[${notification.get('user_id')}].notifications`) || [],
        NotificationSerializer(null, trx, notification)
      ]
    }
  }), [])

  await Promise.map(Object.keys(users), async (user_id) => {

    const user = users[user_id].user

    await sendNotificationEmail(user, users[user_id].notifications.map(notification => ({
      body: notification.description,
      route: notification.url,
      user: notification.subject,
      created_at: notification.created_at
    })))

    const ids = users[user_id].notifications.map(notification => notification.id)

    await knex('maha_notifications').transacting(trx).whereIn('id', ids).update({
      is_delivered: true
    })

  })

  return notifications.map(notification => notification)

}

export const afterCommit = async (trx, result) => {

  await Promise.map(result, async (notification) => {

    await socket.in(`/admin/users/${notification.get('user_id')}`).emit('message', {
      target: `/admin/users/${notification.get('user_id')}`,
      action: 'session',
      data: null
    })

  })

}

const digestCron = cron({
  name: 'notification',
  schedule: '0 0 2 * * *',
  processor: processor,
  afterCommit
})

export default digestCron
