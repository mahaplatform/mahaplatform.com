import NotificationSerializer from '../serializers/notification_serializer'
import { sendNotificationEmail } from '../services/notification_email'
import Notification from '../models/notification'
import socket from '@core/vendor/emitter'
import Queue from '@core/objects/queue'
import moment from 'moment'
import _ from 'lodash'

export const processor = async (req) => {

  const notifications = await Notification.query(qb => {
    qb.joinRaw('inner join "maha_users" on "maha_users"."id"="maha_notifications"."user_id" and "maha_users"."email_notifications_method"=?', 'digest')
    qb.joinRaw('left join "maha_users_notification_types" on "maha_users_notification_types"."user_id"="maha_notifications"."user_id" and "maha_users_notification_types"."notification_type_id"="maha_notifications"."notification_type_id"')
    qb.whereRaw('maha_notifications.created_at < ?', moment().subtract(5, 'minutes'))
    qb.whereNot('maha_users_notification_types.email_enabled', false)
    qb.where('maha_notifications.is_delivered', false)
    qb.orderBy('created_at', 'desc')
  }).fetchAll({
    withRelated: ['app', 'object_owner', 'subject.photo', 'story', 'team', 'user'],
    transacting: req.trx
  }).then(result => result.toArray())

  if(notifications.length === 0) return []

  const users = notifications.reduce((users, notification) => ({
    ...users,
    [notification.get('user_id')]: {
      team: notification.related('team'),
      user: notification.related('user'),
      notifications: [
        ..._.get(users, `[${notification.get('user_id')}].notifications`) || [],
        NotificationSerializer(null, notification)
      ]
    }
  }), {})

  await Promise.map(Object.values(users), async ({ user, team, notifications }) => {
    await sendNotificationEmail(user, notifications.map(notification => ({
      body: notification.description,
      route: `/${team.get('subdomain')}/${notification.url}`,
      user: notification.subject,
      created_at: notification.created_at
    })))
    const ids = notifications.map(notification => notification.id)
    await req.trx('maha_notifications').whereIn('id', ids).update({
      is_delivered: true
    })
  })

  return notifications

}

export const afterCommit = async (req, result) => {
  await Promise.map(result, async (notification) => {
    await socket.in(`/admin/users/${notification.get('user_id')}`).emit('message', {
      target: `/admin/users/${notification.get('user_id')}`,
      action: 'session',
      data: null
    })
  })
}

const digestCron = new Queue({
  queue: 'cron',
  name: 'notification',
  cron: '0 0 2 * * *',
  processor,
  afterCommit
})

export default digestCron
