import NotificationSerializer from '../serializers/notification_serializer'
import { sendNotificationEmail } from '../services/notifications/email'
import Notification from '../models/notification'
import socket from '@core/vendor/emitter'
import Queue from '@core/objects/queue'
import moment from 'moment'
import _ from 'lodash'

export const processor = async (req) => {

  const notifications = await Notification.query(qb => {
    qb.joinRaw('inner join "maha_users" on "maha_users"."id"="maha_notifications"."user_id"')
    qb.joinRaw('inner join "maha_accounts" on "maha_accounts"."id"="maha_users"."account_id" and "maha_accounts"."preferences"->>\'email_notifications_method\'=?', 'digest')
    qb.joinRaw('left join "maha_users_notification_types" on "maha_users_notification_types"."user_id"="maha_notifications"."user_id" and "maha_users_notification_types"."notification_type_id"="maha_notifications"."notification_type_id"')
    qb.whereRaw('maha_notifications.created_at < ?', moment().subtract(5, 'minutes'))
    qb.whereRaw('(maha_users_notification_types.email_enabled is null or maha_users_notification_types.email_enabled=?)', true)
    qb.where('maha_notifications.is_delivered', false)
    qb.orderBy('created_at', 'desc')
  }).fetchAll({
    withRelated: ['app','object_owner','subject.photo','story','team','user.account'],
    transacting: req.trx
  }).then(result => result.toArray())

  if(notifications.length === 0) return []

  const accounts = notifications.reduce((accounts, notification) => {
    const subject = notification.related('subject')
    const team = notification.related('team')
    const user = notification.related('user')
    const account = user.related('account')
    const serialized = NotificationSerializer(null, notification)
    return {
      ...accounts,
      [account.get('id')]: {
        account,
        teams: {
          ..._.get(accounts, `${account.get('id')}.teams`) || {},
          [team.get('id')]: {
            team,
            subjects: {
              ..._.get(accounts, `${account.get('id')}.teams.${team.get('id')}.subjects`) || {},
              [subject.get('id')]: {
                subject: serialized.subject,
                notifications: [
                  ..._.get(accounts, `${account.get('id')}.teams.${team.get('id')}.subjects.${subject.get('id')}.notifications`) || [],
                  {
                    body: serialized.description,
                    route: `/${team.get('subdomain')}${serialized.url}`,
                    subject: serialized.subject,
                    created_at: serialized.created_at
                  }
                ]
              }
            }
          }
        }
      }
    }
  }, {})

  await Promise.map(Object.values(accounts), async (digest) => {

    await sendNotificationEmail(req, {
      digest
    })

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

const sendDigestsCron = new Queue({
  queue: 'cron',
  name: 'send_digests',
  cron: '0 0 2 * * *',
  processor,
  afterCommit
})

export default sendDigestsCron
