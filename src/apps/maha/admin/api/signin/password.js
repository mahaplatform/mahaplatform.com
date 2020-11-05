import { createUserToken } from '@core/utils/user_tokens'
import { validate } from '@core/utils/validation'
import Account from '@apps/maha/models/account'

const passwordRoute = async (req, res) => {

  await validate({
    email: 'required'
  }, req.body)

  if(!req.body.password) return res.status(422).json({
    code: 422,
    message: 'Please enter your password'
  })

  const account = await Account.where({
    email: req.body.email
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(422).json({
    code: 422,
    message: 'Unable to find this user'
  })

  if(!account.authenticate(req.body.password)) return res.status(422).json({
    code: 422,
    message: 'Invalid password'
  })

  await account.save({
    locked_out_at: null
  }, {
    transacting: req.trx,
    patch: true
  })

  res.status(200).respond({
    token: createUserToken(account, 'account_id')
  })

}

export default passwordRoute
