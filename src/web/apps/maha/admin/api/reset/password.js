import { createUserToken } from '../../../../../core/utils/user_tokens'
import { Route, BackframeError } from '../../../../../core/backframe'
import moment from 'moment'

const activity = (req, trx, result, options) => ({
  story: 'reset {object}',
  object: req.user,
  object_owner_id: req.user.get('id'),
  object_text: 'password',
  object_type: null
})

const processor = async (req, trx, options) => {

  if(!req.body.password || !req.body.confirmation) {
    throw new BackframeError({
      code: 422,
      message: 'Please enter and confirm your password'
    })
  }

  if(req.body.password !== req.body.confirmation) {
    throw new BackframeError({
      code: 422,
      message: 'Password do not match'
    })
  }

  try {

    await req.user.save({
      password: req.body.password,
      locked_out_at: null,
      is_blocked: null,
      reset_at: moment()
    }, { patch: true, transacting: trx })

    await req.user.load(['team.logo','team.strategies'], { transacting: trx })

  } catch(err) {

    throw new BackframeError({
      code: 422,
      message: 'Unable to update password'
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
    }
  }

}

const rules = {
  token: 'required'
}

const passwordRoute = new Route({
  activity,
  path: '/password',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default passwordRoute
