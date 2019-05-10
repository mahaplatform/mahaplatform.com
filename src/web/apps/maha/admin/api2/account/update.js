import { activity } from '../../../../../core/services/routes/activities'
import { message } from '../../../../../core/services/routes/emitter'

const updateRoute = async (req, res) => {

  req.user = await req.user.save({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    secondary_email: req.body.secondary_email
  }, {
    patch: true,
    transacting: req.trx
  })

  await message(req, {
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

  res.status(200).respond({
    first_name: req.user.get('first_name'),
    last_name: req.user.get('last_name'),
    email: req.user.get('email'),
    secondary_email: req.user.get('secondary_email')
  })

}

export default updateRoute
