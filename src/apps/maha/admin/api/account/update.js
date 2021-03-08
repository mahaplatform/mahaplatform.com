import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import { updateAccount } from '@apps/maha/services/accounts'

const updateRoute = async (req, res) => {

  await updateAccount(req, {
    account: req.account,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })

  await socket.message(req, {
    channel: 'account',
    action: 'account'
  })

  await activity(req, {
    story: 'updated {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'account',
    object_type: null
  })

  res.status(200).respond(req.user, {
    fields: ['first_name','last_name','email','cell_phone']
  })

}

export default updateRoute
