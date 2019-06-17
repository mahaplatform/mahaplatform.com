import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import Checkit from 'checkit'

const notificationsRoute = async (req, res) => {

  await Checkit({
    token: 'required',
    email_notifications_method: 'required'
  }).run(req.body)

  await req.user.save({
    email_notifications_method: req.body.email_notifications_method
  }, {
    patch: true,
    transacting: req.trx
  })

  const token = createUserToken(req.user, 'user_id')

  await activity(req, {
    story: 'activated {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'account',
    object_type: null
  })

  res.status(200).respond({
    token,
    team: {
      id: req.user.related('team').get('id'),
      title: req.user.related('team').get('title'),
      subdomain: req.user.related('team').get('subdomain'),
      color: req.user.related('team').get('color'),
      logo: req.user.related('team').related('logo').get('path'),
      strategies: req.user.related('team').related('strategies').toJSON().map(strategy => strategy.name)
    },
    user: {
      id: req.user.get('id'),
      full_name: req.user.get('full_name'),
      initials: req.user.get('initials'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id'),
      photo: req.user.related('photo').get('path')
    }
  })

}

export default notificationsRoute
