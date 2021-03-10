import NotificationSerializer from '@apps/maha/serializers/notification_serializer'
import socket from '@core/services/routes/emitter'
import Notification from '@apps/maha/models/notification'

const listRoute = async (req, res) => {

  const notifications = await Notification.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['subject.photo','app','story','object_owner','user'],
    transacting: req.trx
  })

  await req.trx('maha_notifications')
    .where('user_id', req.user.get('id'))
    .update({
      is_seen: true
    })

  await socket.refresh(req, {
    channel: '/notifications/unread',
    target: '/admin/notifications/unread'
  })

  await res.status(200).respond(notifications, NotificationSerializer)

}

export default listRoute
