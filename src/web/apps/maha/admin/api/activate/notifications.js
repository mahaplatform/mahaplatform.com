import { createUserToken } from '../../../../../core/utils/user_tokens'
import { Route, BackframeError } from '../../../../../core/backframe'
import moment from 'moment'

const activity = (req, trx, result, options) => ({
  story: 'activated {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'account',
  object_type: null
})

const processor = async (req, trx, options) => {

  if(!req.body.email_notifications_method) {
    throw new BackframeError({
      code: 422,
      message: 'Please choose a notification method'
    })
  }

  try {

    await req.user.save({
      email_notifications_method: req.body.email_notifications_method,
      is_active: true, activated_at: moment()
    }, { patch: true, transacting: trx })

    await req.user.load(['team.logo','team.strategies'], { transacting: trx })

  } catch(err) {

    console.log(err)

    throw new BackframeError({
      code: 422,
      message: 'Unable to update notification method'
    })

  }

  const token = createUserToken(req.user, 'user_id')

  return {
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
  }

}

const rules = {
  token: 'required',
  email_notifications_method: 'required'
}

const notificationsRoute = new Route({
  activity,
  path: '/notifications',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default notificationsRoute
