import NotificationSerializer from '../../../serializers/notification_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Notification from '../../../models/notification'

const seenRoute = async (req, res) => {

  const notification = await Notification.scope({
    team: req.team,
    user: req.user
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['subject.photo','app','story','object_owner','user'],
    transacting: req.trx
  })

  if(!notification) return res.status(404).json({
    code: 404,
    message: 'Unable to find notification'
  })

  await req.resource.save({
    is_visited: true
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: '/admin/user',
    target: '/admin/notifications'
  })

  res.status(200).respond(notification, (notification) => {
    return NotificationSerializer(req, req.trx, notification)
  })

}

export default seenRoute
