import { refresh } from '../../../../../core/services/routes/emitter'
import Notification from '../../../models/notification'

const seenRoute = async (req, res) => {

  if(req.body.ids) {

    await Notification.transacting(req.trx).query(qb => {
      qb.whereIn('id', req.body.ids)
    }).update({
      is_seen: true
    })

  }

  await refresh(req, {
    channel: '/admin/user',
    target: '/admin/notifications'
  })

  res.status(200).respond(true)

}

export default seenRoute
