import NotificationSerializer from '../../../serializers/notification_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Notification from '../../../models/notification'
import knex from '../../../../../core/services/knex'

const listRoute = async (req, res) => {

  const notifications = await Notification.scope({
    team: req.team
  }).query(qb => {
    qb.where('user_id', req.user.get('id'))
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['subject.photo','app','story','object_owner','user'],
    transacting: req.trx
  })

  await knex('maha_notifications').transacting(req.trx).where({
    user_id: req.user.get('id')
  }).update({
    is_seen: true
  })

  await socket.refresh(req, {
    channel: '/notifications/unread',
    target: '/admin/notifications/unread'
  })

  res.status(200).respond(notifications, (notification) => {
    return NotificationSerializer(req, req.trx, notification)
  })

}

export default listRoute
