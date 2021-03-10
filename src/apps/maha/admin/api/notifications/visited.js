import NotificationSerializer from '@apps/maha/serializers/notification_serializer'
import socket from '@core/services/routes/emitter'
import Notification from '@apps/maha/models/notification'

const visitedRoute = async (req, res) => {

  const notification = await Notification.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('user_id', req.user.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['subject.photo','app','story','object_owner','user'],
    transacting: req.trx
  })

  if(!notification) return res.status(404).json({
    code: 404,
    message: 'Unable to find notification'
  })

  await notification.save({
    is_visited: true
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: 'user',
    target: '/admin/notifications'
  })

  await res.status(200).respond(notification, NotificationSerializer)

}

export default visitedRoute
