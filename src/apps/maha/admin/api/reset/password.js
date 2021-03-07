import { createUserToken } from '@core/utils/user_tokens'
import moment from 'moment'

const passwordRoute = async (req, res, next) => {

  if(!req.body.password || !req.body.confirmation) return res.status(422).json({
    code: 422,
    message: 'Please enter and confirm your password'
  })

  if(req.body.password !== req.body.confirmation) return res.status(422).json({
    code: 422,
    message: 'Password do not match'
  })

  await req.account.save({
    password: req.body.password,
    locked_out_at: null,
    is_blocked: null,
    reset_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  const token = createUserToken({
    account_id: req.account.get('id')
  })

  res.status(200).respond({
    token
  })

}

export default passwordRoute
