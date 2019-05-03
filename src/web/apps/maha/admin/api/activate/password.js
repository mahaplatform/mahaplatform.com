import { loadUserFromToken } from '../../../../../core/utils/user_tokens'
import { Route, BackframeError } from '../../../../../core/backframe'

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

  const { user } = await loadUserFromToken('activation_id', req.body.token, trx)

  try {

    const data = { password: req.body.password }

    await user.save(data, { patch: true, transacting: trx })

  } catch(err) {

    throw new BackframeError({ code: 422, message: 'Unable to update password' })

  }

  return {
    photo_id: user.get('photo_id')
  }

}

const rules = {
  token: 'required'
}

const passwordRoute = new Route({
  path: '/password',
  method: 'post',
  authenticated: false,
  processor,
  rules
})

export default passwordRoute
