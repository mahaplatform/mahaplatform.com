import { activity } from '../../../../../../web/core/services/routes/activities'
import { whitelist } from '../../../../../../web/core/services/routes/params'
import socket from '../../../../../../web/core/services/routes/emitter'
import { validate } from '../../../../../../web/core/utils/validation'

const passwordRoute = async (req, res) => {

  await validate({
    password: 'required',
    confirmation: ['required', 'matchesField:password']
  }, req.body)

  await req.user.save({
    ...whitelist(req.body, ['password'])
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
    object_text: 'password',
    object_type: null
  })

  res.status(200).respond(true)

}

export default passwordRoute
