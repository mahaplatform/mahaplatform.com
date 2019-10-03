import { createUserToken } from '../../../../../web/core/utils/user_tokens'
import { validate } from '../../../../../web/core/utils/validation'
import User from '../../../models/user'

const passwordRoute = async (req, res) => {

  await validate({
    team_id: 'required',
    email: 'required'
  }, req.body)

  if(!req.body.password) return res.status(422).json({
    code: 422,
    message: 'Please enter your password'
  })

  const user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(422).json({
    code: 422,
    message: 'Unable to find this user'
  })

  if(!user.authenticate(req.body.password)) return res.status(422).json({
    code: 422,
    message: 'Invalid password'
  })

  await user.save({
    locked_out_at: null
  }, {
    transacting: req.trx
  })

  res.status(200).respond({
    token: createUserToken(user, 'user_id')
  })

}

export default passwordRoute
