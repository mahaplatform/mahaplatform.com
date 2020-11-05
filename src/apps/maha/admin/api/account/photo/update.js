import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { updatePhoto } from '../../../../services/accounts'

const updateRoute = async (req, res) => {

  await updatePhoto(req, {
    account: req.account,
    photo_id: req.body.photo_id
  })

  await socket.message(req, {
    channel: 'account',
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

export default updateRoute
