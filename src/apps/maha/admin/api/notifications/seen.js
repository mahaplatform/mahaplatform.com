import socket from '../../../../../core/services/routes/emitter'
import Notification from '../../../models/notification'

const seenRoute = async (req, res) => {

  if(req.body.ids) {
    await Notification.query(qb => {
      qb.whereIn('id', req.body.ids)
    }).save(null, {
      transacting: req.trx,
      is_seen: true
    })
  }

  await socket.refresh(req, {
    channel: 'user',
    target: '/admin/notifications'
  })

  res.status(200).respond(true)

}

export default seenRoute
