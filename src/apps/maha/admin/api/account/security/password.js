import { activity } from '@core/services/routes/activities'
import { whitelist } from '@core/services/routes/params'
import socket from '@core/services/routes/emitter'
import { validate } from '@core/utils/validation'

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

  await res.status(200).respond(true)

}

export default passwordRoute
