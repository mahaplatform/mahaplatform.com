import { createUserToken } from '../../../core/utils/user_tokens'
import { Route, mailer, BackframeError, User } from '../../../server'

const activity = (req, trx, result, options) => ({
  story: 'requested {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'password reset',
  object_type: null
})

const processor = async (req, trx, options) => {

  const conditions = {
    team_id: req.body.team_id,
    email: req.body.email
  }

  req.user = await User.where(conditions).fetch({ withRelated: ['team'], transacting: trx })

  req.team = req.user.related('team')

  if(!req.user) {
    throw new BackframeError({
      code: 404,
      message: 'Unable to find this user'
    })
  }

  if(!req.user.get('is_active')) {
    throw new BackframeError({
      code: 403,
      message: 'Your account has been disabled'
    })
  }

  const token = createUserToken(req.user, 'reset_id')

  await mailer.enqueue(req, trx, {
    team_id: req.body.team_id,
    user: req.user,
    template: 'team:reset',
    data: {
      first_name: req.user.get('first_name'),
      reset_url: `${process.env.WEB_HOST}/admin/reset/${token}`
    }
  })

}

const rules = {
  team_id: 'required',
  email: 'required'
}

const emailRoute = new Route({
  activity,
  path: '/email',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default emailRoute
