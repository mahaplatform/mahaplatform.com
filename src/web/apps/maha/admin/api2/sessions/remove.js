import { message } from '../../../../../core/services/routes/emitter'
import Session from '../../../models/session'

const removeRoute = async (req, res) => {

  const session = await Session.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  await session.destroy({
    transacting: req.trx
  })

  await message(req, {
    channel: `/admin/users/${session.get('user_id')}`,
    action: 'session'
  })

  await message(req, {
    channel: `/admin/sessions/${session.get('id')}`,
    action: 'signout'
  })

  res.status(200).respond(true)

}

export default removeRoute
