import NotificationSerializer from '../../../serializers/notification_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Notification from '../../../models/notification'

const listRoute = async (req, res) => {

  const notifications = await Notification.filter({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('user_id', req.user.get('id'))
    },
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: 'created_at',
    sortParams: ['created_at']
  }).fetchPage({
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

  res.status(200).respond(notifications, NotificationSerializer)

}

export default listRoute
