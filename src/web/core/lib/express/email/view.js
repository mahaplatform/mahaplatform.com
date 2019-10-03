import Notification from '../../../../../apps/maha/models/notification'

const viewRoute = async (req, res) => {

  const notification = await Notification.where({
    code: req.params.code
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!notification) return res.status(404).send('not found')

  await notification.save({
    is_seen: true,
    is_visited: true
  }, {
    transacting: req.trx
  })

  res.redirect(notification.get('url'))

}

export default viewRoute
