import { getAccountToken } from '@apps/maha/services/accounts'
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

  res.status(200).respond({
    token: getAccountToken(req, {
      account: req.account
    })
  })

}

export default passwordRoute
