import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'

const updateRoute = async (req, res) => {

  req.user = await req.user.save({
    ...whitelist(req.body, ['first_name','last_name','email','secondary_email'])
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.message(req, {
    channel: 'user',
    action: 'session'
  })

  await activity(req, {
    story: 'updated {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'account',
    object_type: null
  })

  res.status(200).respond(req.user, {
    fields: ['first_name','last_name','email','secondary_email','cell_phone']
  })

}

export default updateRoute
