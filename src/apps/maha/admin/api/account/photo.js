import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'

const photoRoute = async (req, res) => {

  req.user = await req.user.save({
    photo_id: req.body.photo_id
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await activity(req, {
    story: 'changed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'photo',
    object_type: null
  })

  res.status(200).respond(req.user, {
    fields: ['photo_id']
  })

}

export default photoRoute
