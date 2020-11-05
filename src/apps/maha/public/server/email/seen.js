import Notification from '@apps/maha/models/notification'
import path from 'path'

const trackerFile = path.resolve(__dirname,'..','..','..','admin','public','images','tracker.png')

const seenRoute = async (req, res) => {

  const notifications = await Notification.query(qb => {
    qb.whereIn('code', req.params.codes.match(/.{1,4}/g))
    qb.where('is_seen', false)
  }).fetchAll({
    transacting: req.trx
  }).then(notifications => notifications.toArray())

  await Promise.map(notifications, async (notification) => {
    await notification.save({
      is_seen: true
    }, {
      patch: true,
      transacting: req.trx
    })
  })

  res.sendFile(trackerFile)

}

export default seenRoute
