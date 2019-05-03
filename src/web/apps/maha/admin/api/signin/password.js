import { BackframeError, Route } from '../../../../../core/backframe'
import User from '../../../models/user'
import { createUserToken } from '../../../../../core/utils/user_tokens'

const processor = async (req, trx, options) => {

  if(!req.body.password) {
    throw new BackframeError({
      code: 422,
      message: 'Please enter your password'
    })
  }

  const user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({ transacting: trx })

  if(!user) throw new BackframeError({ code: 422, message: 'Unable to find this user'})

  if(!user.authenticate(req.body.password)) {

    throw new BackframeError({
      code: 422,
      message: 'Invalid password'
    })
  }

  await user.save({
    locked_out_at: null
  }, { transacting: trx })

  const token = createUserToken(user, 'user_id')

  return { token }

}

const rules = {
  team_id: 'required',
  email: 'required'
}

const passwordRoute = new Route({
  path: '/password',
  method: 'post',
  processor,
  rules
})

export default passwordRoute
