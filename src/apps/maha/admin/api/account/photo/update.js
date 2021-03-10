import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { updatePhoto } from '@apps/maha/services/accounts'

const updateRoute = async (req, res) => {

  await updatePhoto(req, {
    account: req.account,
    photo_id: req.body.photo_id
  })

  await socket.message(req, {
    channel: 'account',
    action: 'account'
  })

  await activity(req, {
    story: 'changed {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'photo',
    object_type: null
  })

  await res.status(200).respond(req.user, {
    fields: ['photo_id']
  })

}

export default updateRoute
